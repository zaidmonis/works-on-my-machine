import React from "react";
import { Link, useParams } from "react-router-dom";
import api from "../lib/api";

const WeekDetail: React.FC = () => {
  const { weekId } = useParams();
  const [week, setWeek] = React.useState<any | null>(null);
  const [lessons, setLessons] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!weekId) return;
    api.get(`/weeks/${weekId}`).then((response) => {
      setWeek(response.data.week);
      setLessons(response.data.lessons);
    });
  }, [weekId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{week?.title}</h1>
        <p className="text-slate-400 mt-2">
          Focus on {week?.phase?.title} this week with lessons and project work.
        </p>
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Lessons</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link to={`/lesson/${lesson.id}`} className="text-cyan-300">
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Checklist</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-300 list-disc list-inside">
          <li>Finish the lessons listed above.</li>
          <li>Complete at least one exercise in the playground.</li>
          <li>Update your project checklist for this phase.</li>
        </ul>
      </section>
    </div>
  );
};

export default WeekDetail;
