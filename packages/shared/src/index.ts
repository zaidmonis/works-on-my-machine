import { z } from "zod";

export const PlanName = z.enum(["W4", "W8", "W12"]);
export type PlanName = z.infer<typeof PlanName>;

export const AuthSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
});

export const PlanSelectSchema = z.object({
  plan: PlanName
});

export const QuizAttemptSchema = z.object({
  answers: z.array(z.number())
});

export const ExerciseAttemptSchema = z.object({
  code: z.string(),
  status: z.enum(["STARTED", "COMPLETED"])
});

export const ProjectStatusSchema = z.object({
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "DONE"])
});

export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional()
  })
});

export type AuthPayload = z.infer<typeof AuthSchema>;
export type PlanSelectPayload = z.infer<typeof PlanSelectSchema>;
export type QuizAttemptPayload = z.infer<typeof QuizAttemptSchema>;
export type ExerciseAttemptPayload = z.infer<typeof ExerciseAttemptSchema>;
export type ProjectStatusPayload = z.infer<typeof ProjectStatusSchema>;
