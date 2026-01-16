import React from "react";
import { Link, useParams } from "react-router-dom";
import api from "../lib/api";

const PhaseDetail: React.FC = () => {
  const { phaseId } = useParams();
  const [phase, setPhase] = React.useState<any | null>(null);
  const [userPlan, setUserPlan] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (!phaseId) return;
    api.get(`/phases/${phaseId}`).then((response) => setPhase(response.data.phase));
    api.get("/progress/summary").then((response) => setUserPlan(response.data.plan));
  }, [phaseId]);

  const weeks = phase?.weeks ?? [];
  const filteredWeeks = userPlan?.planId
    ? weeks.filter((week: any) => week.planId === userPlan.planId)
    : weeks;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{phase?.title}</h1>
        <p className="text-slate-400 mt-2">{phase?.description}</p>
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Weeks in this phase</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {filteredWeeks.map((week: any) => (
            <li key={week.id}>
              <Link to={`/week/${week.id}`} className="text-cyan-300">
                {week.title}
              </Link>
            </li>
          ))}
          {filteredWeeks.length === 0 && <li className="text-slate-400">Select a plan to see weeks.</li>}
        </ul>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Milestone checklist</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-300 list-disc list-inside">
          {(phase?.milestoneChecklist ?? []).map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Lessons</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {phase?.lessons?.map((lesson: any) => (
              <li key={lesson.id}>
                <Link to={`/lesson/${lesson.id}`} className="text-cyan-300">
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Projects</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {phase?.projects?.map((project: any) => (
              <li key={project.id}>
                <Link to={`/project/${project.id}`} className="text-cyan-300">
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Resources</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {phase?.resources?.map((resource: any) => (
            <li key={resource.id}>
              <a href={resource.url} target="_blank" rel="noreferrer" className="text-cyan-300">
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PhaseDetail;
