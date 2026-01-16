import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { createRequire } from "module";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const asyncHandler =
  (fn: express.RequestHandler): express.RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const errorResponse = (code: string, message: string, details?: unknown) => ({
  error: { code, message, details }
});

const require = createRequire(import.meta.url);
const {
  AuthSchema,
  ExerciseAttemptSchema,
  PlanSelectSchema,
  ProjectStatusSchema,
  QuizAttemptSchema
} = require("@works/shared");

const parseJsonArray = <T,>(value: string | null | undefined): T[] => {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalizeProject = (project: any) => ({
  ...project,
  checklist: parseJsonArray<string>(project.checklist)
});

const normalizePhase = (phase: any) => ({
  ...phase,
  milestoneChecklist: parseJsonArray<string>(phase.milestoneChecklist),
  projects: Array.isArray(phase.projects) ? phase.projects.map(normalizeProject) : phase.projects
});

const normalizeQuizQuestion = (question: any) => ({
  ...question,
  options: parseJsonArray<string>(question.options)
});

const authMiddleware: express.RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json(errorResponse("UNAUTHORIZED", "Missing token"));
  }

  const [, token] = authHeader.split(" ");
  if (!token) {
    return res.status(401).json(errorResponse("UNAUTHORIZED", "Invalid token"));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return res.status(401).json(errorResponse("UNAUTHORIZED", "User not found"));
    }
    (req as express.Request & { userId: string }).userId = user.id;
    return next();
  } catch (error) {
    return res.status(401).json(errorResponse("UNAUTHORIZED", "Token invalid"));
  }
};

const optionalAuthMiddleware: express.RequestHandler = async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }

  const [, token] = authHeader.split(" ");
  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (user) {
      (req as express.Request & { userId: string }).userId = user.id;
    }
  } catch {
    // Ignore invalid tokens for optional auth.
  }

  return next();
};

app.post(
  "/api/auth/signup",
  asyncHandler(async (req, res) => {
    const parsed = AuthSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(errorResponse("VALIDATION", "Invalid payload", parsed.error));
    }

    const existing = await prisma.user.findUnique({ where: { username: parsed.data.username } });
    if (existing) {
      return res.status(400).json(errorResponse("USERNAME_TAKEN", "Username already exists"));
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const user = await prisma.user.create({
      data: { username: parsed.data.username, passwordHash }
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user.id, username: user.username } });
  })
);

app.post(
  "/api/auth/login",
  asyncHandler(async (req, res) => {
    const parsed = AuthSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(errorResponse("VALIDATION", "Invalid payload", parsed.error));
    }

    const user = await prisma.user.findUnique({ where: { username: parsed.data.username } });
    if (!user) {
      return res.status(401).json(errorResponse("INVALID_CREDENTIALS", "Invalid credentials"));
    }

    const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json(errorResponse("INVALID_CREDENTIALS", "Invalid credentials"));
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user.id, username: user.username } });
  })
);

app.post("/api/auth/logout", (_req, res) => {
  return res.json({ ok: true });
});

app.get(
  "/api/me",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = (req as express.Request & { userId: string }).userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return res.json({ user: { id: user?.id, username: user?.username } });
  })
);

app.get(
  "/api/roadmap",
  asyncHandler(async (_req, res) => {
    const phases = await prisma.phase.findMany({
      include: {
        lessons: true,
        projects: true
      },
      orderBy: { order: "asc" }
    });
    return res.json({ phases: phases.map(normalizePhase) });
  })
);

app.get(
  "/api/phases",
  asyncHandler(async (_req, res) => {
    const phases = await prisma.phase.findMany({ orderBy: { order: "asc" } });
    return res.json({ phases: phases.map(normalizePhase) });
  })
);

app.get(
  "/api/phases/:phaseId",
  asyncHandler(async (req, res) => {
    const phase = await prisma.phase.findUnique({
      where: { id: req.params.phaseId },
      include: {
        lessons: { orderBy: { order: "asc" } },
        projects: true,
        resources: true,
        weeks: { include: { plan: true }, orderBy: { index: "asc" } }
      }
    });

    if (!phase) {
      return res.status(404).json(errorResponse("NOT_FOUND", "Phase not found"));
    }

    return res.json({ phase: normalizePhase(phase) });
  })
);

app.get(
  "/api/weeks/:weekId",
  asyncHandler(async (req, res) => {
    const week = await prisma.week.findUnique({
      where: { id: req.params.weekId },
      include: {
        phase: true
      }
    });

    if (!week) {
      return res.status(404).json(errorResponse("NOT_FOUND", "Week not found"));
    }

    const lessons = await prisma.lesson.findMany({
      where: { phaseId: week.phaseId },
      orderBy: { order: "asc" }
    });

    return res.json({ week, lessons });
  })
);

app.get(
  "/api/lessons/:lessonId",
  optionalAuthMiddleware,
  asyncHandler(async (req, res) => {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.lessonId },
      include: {
        quizQuestions: true,
        exercises: true
      }
    });

    if (!lesson) {
      return res.status(404).json(errorResponse("NOT_FOUND", "Lesson not found"));
    }

    const userId = (req as express.Request & { userId?: string }).userId;
    const progress = userId
      ? await prisma.userLessonProgress.findUnique({
          where: { userId_lessonId: { userId, lessonId: lesson.id } }
        })
      : null;

    return res.json({
      completed: progress?.completed ?? false,
      lesson: {
        ...lesson,
        quizQuestions: lesson.quizQuestions.map(normalizeQuizQuestion)
      }
    });
  })
);

app.get(
  "/api/projects",
  asyncHandler(async (_req, res) => {
    const projects = await prisma.project.findMany({ include: { phase: true } });
    return res.json({ projects: projects.map(normalizeProject) });
  })
);

app.get(
  "/api/projects/:projectId",
  asyncHandler(async (req, res) => {
    const project = await prisma.project.findUnique({
      where: { id: req.params.projectId },
      include: { phase: true }
    });
    if (!project) {
      return res.status(404).json(errorResponse("NOT_FOUND", "Project not found"));
    }
    return res.json({ project: normalizeProject(project) });
  })
);

app.post(
  "/api/plan/select",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const parsed = PlanSelectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(errorResponse("VALIDATION", "Invalid payload", parsed.error));
    }

    const plan = await prisma.plan.findFirst({ where: { name: parsed.data.plan } });
    if (!plan) {
      return res.status(404).json(errorResponse("NOT_FOUND", "Plan not found"));
    }

    const userId = (req as express.Request & { userId: string }).userId;

    await prisma.userPlan.deleteMany({ where: { userId } });
    const userPlan = await prisma.userPlan.create({
      data: {
        userId,
        planId: plan.id,
        currentWeekIndex: 1
      }
    });

    return res.json({ userPlan });
  })
);

app.get(
  "/api/progress/summary",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = (req as express.Request & { userId: string }).userId;
    const userPlan = await prisma.userPlan.findFirst({
      where: { userId },
      include: { plan: true }
    });

    const completedLessons = await prisma.userLessonProgress.findMany({
      where: { userId, completed: true }
    });

    const phases = await prisma.phase.findMany({
      include: { lessons: true },
      orderBy: { order: "asc" }
    });

    const phaseProgress = phases.map((phase) => {
      const total = phase.lessons.length;
      const completed = completedLessons.filter((lesson) => lesson.lessonId && phase.lessons.some((l) => l.id === lesson.lessonId)).length;
      return {
        phaseId: phase.id,
        title: phase.title,
        completed,
        total
      };
    });

    return res.json({
      plan: userPlan,
      completedLessons: completedLessons.length,
      phaseProgress
    });
  })
);

app.post(
  "/api/lessons/:lessonId/complete",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = (req as express.Request & { userId: string }).userId;
    const lessonId = req.params.lessonId;

    const progress = await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId }
      },
      update: { completed: true, completedAt: new Date() },
      create: { userId, lessonId, completed: true, completedAt: new Date() }
    });

    return res.json({ progress });
  })
);

app.post(
  "/api/lessons/:lessonId/uncomplete",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = (req as express.Request & { userId: string }).userId;
    const lessonId = req.params.lessonId;

    const progress = await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { completed: false, completedAt: null },
      create: { userId, lessonId, completed: false, completedAt: null }
    });

    return res.json({ progress });
  })
);

app.post(
  "/api/quizzes/:lessonId/attempt",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const parsed = QuizAttemptSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(errorResponse("VALIDATION", "Invalid payload", parsed.error));
    }

    const lessonId = req.params.lessonId;
    const questions = await prisma.quizQuestion.findMany({ where: { lessonId } });
    const total = questions.length;
    const score = questions.reduce((acc, question, index) => {
      return acc + (parsed.data.answers[index] === question.correctIndex ? 1 : 0);
    }, 0);

    const userId = (req as express.Request & { userId: string }).userId;
    const attempt = await prisma.userQuizAttempt.create({
      data: {
        userId,
        lessonId,
        score,
        total
      }
    });

    const completed = total > 0 && score === total;
    if (completed) {
      await prisma.userLessonProgress.upsert({
        where: { userId_lessonId: { userId, lessonId } },
        update: { completed: true, completedAt: new Date() },
        create: { userId, lessonId, completed: true, completedAt: new Date() }
      });
    }

    return res.json({ attempt, score, total, completed });
  })
);

app.post(
  "/api/exercises/:exerciseId/attempt",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const parsed = ExerciseAttemptSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(errorResponse("VALIDATION", "Invalid payload", parsed.error));
    }

    const userId = (req as express.Request & { userId: string }).userId;
    const exerciseId = req.params.exerciseId;

    const attempt = await prisma.userExerciseAttempt.upsert({
      where: { userId_exerciseId: { userId, exerciseId } },
      update: { code: parsed.data.code, status: parsed.data.status },
      create: { userId, exerciseId, code: parsed.data.code, status: parsed.data.status }
    });

    return res.json({ attempt });
  })
);

app.post(
  "/api/projects/:projectId/status",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const parsed = ProjectStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(errorResponse("VALIDATION", "Invalid payload", parsed.error));
    }

    const userId = (req as express.Request & { userId: string }).userId;
    const projectId = req.params.projectId;

    const progress = await prisma.userProjectProgress.upsert({
      where: { userId_projectId: { userId, projectId } },
      update: { status: parsed.data.status },
      create: { userId, projectId, status: parsed.data.status }
    });

    return res.json({ progress });
  })
);

app.get(
  "/api/progress/export",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = (req as express.Request & { userId: string }).userId;
    const [lessonProgress, quizAttempts, exerciseAttempts, projectProgress, userPlan] =
      await Promise.all([
        prisma.userLessonProgress.findMany({ where: { userId } }),
        prisma.userQuizAttempt.findMany({ where: { userId } }),
        prisma.userExerciseAttempt.findMany({ where: { userId } }),
        prisma.userProjectProgress.findMany({ where: { userId } }),
        prisma.userPlan.findFirst({ where: { userId }, include: { plan: true } })
      ]);

    return res.json({
      userPlan,
      lessonProgress,
      quizAttempts,
      exerciseAttempts,
      projectProgress
    });
  })
);

app.post(
  "/api/progress/reset",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = (req as express.Request & { userId: string }).userId;
    await prisma.userLessonProgress.deleteMany({ where: { userId } });
    await prisma.userQuizAttempt.deleteMany({ where: { userId } });
    await prisma.userExerciseAttempt.deleteMany({ where: { userId } });
    await prisma.userProjectProgress.deleteMany({ where: { userId } });
    await prisma.userPlan.deleteMany({ where: { userId } });

    return res.json({ ok: true });
  })
);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json(errorResponse("SERVER_ERROR", "Unexpected error"));
});

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
