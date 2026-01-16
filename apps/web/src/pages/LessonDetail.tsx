import React from "react";
import { Link, useParams } from "react-router-dom";
import api from "../lib/api";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { usePlayground } from "../lib/playground";
import { useAuth } from "../lib/auth";

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = React.useState<any | null>(null);
  const [phaseLessons, setPhaseLessons] = React.useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = React.useState<Array<number | null>>([]);
  const [quizResult, setQuizResult] = React.useState<any | null>(null);
  const [completed, setCompleted] = React.useState(false);
  const { code, setCode, setLanguage } = usePlayground();
  const { isGuest } = useAuth();

  const loadGuestProgress = () => {
    try {
      const stored = sessionStorage.getItem("guestLessonProgress");
      return stored ? (JSON.parse(stored) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  };

  const saveGuestProgress = (progress: Record<string, boolean>) => {
    sessionStorage.setItem("guestLessonProgress", JSON.stringify(progress));
  };

  const getGuestCompleted = (id: string) => {
    const progress = loadGuestProgress();
    return Boolean(progress[id]);
  };

  const setGuestCompleted = (id: string, value: boolean) => {
    const progress = loadGuestProgress();
    if (value) {
      progress[id] = true;
    } else {
      delete progress[id];
    }
    saveGuestProgress(progress);
  };

  React.useEffect(() => {
    if (!lessonId) return;
    setCompleted(false);
    setQuizResult(null);
    api.get(`/lessons/${lessonId}`).then((response) => {
      setLesson(response.data.lesson);
      if (isGuest) {
        setCompleted(getGuestCompleted(lessonId));
      } else {
        setCompleted(Boolean(response.data.completed));
      }
      setQuizAnswers(new Array(response.data.lesson.quizQuestions.length).fill(null));
    });
  }, [lessonId, isGuest]);

  React.useEffect(() => {
    if (!lesson?.phaseId) return;
    api.get(`/phases/${lesson.phaseId}`).then((response) => setPhaseLessons(response.data.phase.lessons));
  }, [lesson?.phaseId]);

  const currentIndex = phaseLessons.findIndex((item) => item.id === lessonId);
  const prevLesson = currentIndex > 0 ? phaseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < phaseLessons.length - 1 ? phaseLessons[currentIndex + 1] : null;

  const handleComplete = async () => {
    if (!lessonId) return;
    if (isGuest) {
      setGuestCompleted(lessonId, true);
      setCompleted(true);
      return;
    }
    await api.post(`/lessons/${lessonId}/complete`);
    setCompleted(true);
  };

  const handleQuizSubmit = async () => {
    if (!lessonId) return;
    const answers = quizAnswers.map((answer) => (answer === null ? -1 : answer));
    if (isGuest) {
      const questions = lesson?.quizQuestions ?? [];
      const total = questions.length;
      const score = questions.reduce((acc: number, question: any, index: number) => {
        return acc + (answers[index] === question.correctIndex ? 1 : 0);
      }, 0);
      const completedQuiz = total > 0 && score === total;
      setQuizResult({ score, total, completed: completedQuiz });
      if (completedQuiz && lessonId) {
        setGuestCompleted(lessonId, true);
        setCompleted(true);
      }
      return;
    }
    const response = await api.post(`/quizzes/${lessonId}/attempt`, { answers });
    setQuizResult(response.data);
    if (response.data.completed) {
      setCompleted(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">{lesson?.title}</h1>
          <span className="text-sm text-slate-400">{lesson?.estimatedMinutes} min</span>
        </div>
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => void handleComplete()}
            className="bg-cyan-500 text-slate-900 px-4 py-2 rounded text-sm"
          >
            {completed ? "Completed" : "Mark complete"}
          </button>
          <Link to="/playground" className="text-sm text-cyan-300">
            Open playground
          </Link>
        </div>
      </div>

      {lesson && <MarkdownRenderer content={lesson.contentMarkdown} />}

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Mini-quiz</h2>
        <div className="mt-4 space-y-4">
          {lesson?.quizQuestions?.map((question: any, index: number) => (
            <div key={question.id} className="space-y-2">
              <p className="text-sm">{question.question}</p>
              <div className="grid gap-2">
                {question.options.map((option: string, optionIndex: number) => (
                  <label key={option} className="text-xs text-slate-300 flex gap-2">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={quizAnswers[index] === optionIndex}
                      onChange={() => {
                        const copy = [...quizAnswers];
                        copy[index] = optionIndex;
                        setQuizAnswers(copy);
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => void handleQuizSubmit()}
          className="mt-4 bg-slate-800 px-4 py-2 rounded text-sm"
        >
          Submit quiz
        </button>
        {quizResult && (
          <p className="mt-3 text-sm text-cyan-300">
            Score: {quizResult.score}/{quizResult.total}
          </p>
        )}
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Exercises</h2>
        <div className="mt-4 space-y-4">
          {lesson?.exercises?.map((exercise: any) => (
            <div key={exercise.id} className="border border-slate-800 rounded-lg p-4">
              <p className="text-sm text-slate-200">{exercise.promptMarkdown}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setCode(exercise.starterCode);
                    setLanguage("javascript");
                  }}
                  className="text-xs bg-cyan-600 text-slate-900 px-3 py-1 rounded"
                >
                  Load starter code
                </button>
                <button
                  onClick={() =>
                    api.post(`/exercises/${exercise.id}/attempt`, { code, status: "STARTED" })
                  }
                  className="text-xs bg-slate-800 px-3 py-1 rounded"
                >
                  Save attempt
                </button>
                <button
                  onClick={() =>
                    api.post(`/exercises/${exercise.id}/attempt`, { code, status: "COMPLETED" })
                  }
                  className="text-xs bg-emerald-500 text-slate-900 px-3 py-1 rounded"
                >
                  Mark complete
                </button>
                <Link to="/playground" className="text-xs text-cyan-300">
                  Open in playground
                </Link>
              </div>
              <p className="mt-3 text-xs text-slate-400">Hint: {exercise.solutionHintMarkdown}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-between text-sm">
        {prevLesson ? (
          <Link to={`/lesson/${prevLesson.id}`} className="text-cyan-300">
            ← Previous lesson
          </Link>
        ) : (
          <span />
        )}
        {nextLesson && (
          <Link to={`/lesson/${nextLesson.id}`} className="text-cyan-300">
            Next lesson →
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
