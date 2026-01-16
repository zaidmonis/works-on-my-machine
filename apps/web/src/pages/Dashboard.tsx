import React from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import ProgressBar from "../components/ProgressBar";

const Dashboard: React.FC = () => {
  const [summary, setSummary] = React.useState<any | null>(null);

  React.useEffect(() => {
    api.get("/progress/summary").then((response) => setSummary(response.data));
  }, []);

  const totalLessons = summary?.phaseProgress?.reduce((acc: number, phase: any) => acc + phase.total, 0) ?? 0;
  const completedLessons = summary?.completedLessons ?? 0;
  const overallPercent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-slate-400 mt-2">Pick up where you left off and keep moving forward.</p>
        </div>
        <Link
          to="/plan/select"
          className="bg-slate-800 px-4 py-2 rounded text-sm text-slate-200 hover:bg-slate-700"
        >
          Change plan
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Overall progress</h2>
        <p className="text-sm text-slate-400 mt-1">
          {completedLessons} lessons completed out of {totalLessons}
        </p>
        {summary?.plan && (
          <p className="text-sm text-slate-400 mt-1">
            Current plan: {summary.plan.plan.name} · Week {summary.plan.currentWeekIndex}
          </p>
        )}
        <div className="mt-4">
          <ProgressBar value={overallPercent} />
        </div>
        <div className="mt-4">
          <Link to="/roadmap" className="text-cyan-300 text-sm">
            View roadmap →
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {summary?.phaseProgress?.map((phase: any) => {
          const percentage = phase.total ? Math.round((phase.completed / phase.total) * 100) : 0;
          return (
            <div key={phase.phaseId} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <h3 className="text-sm font-semibold">{phase.title}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {phase.completed}/{phase.total} lessons complete
              </p>
              <div className="mt-3">
                <ProgressBar value={percentage} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Quick resume</h2>
        <p className="text-sm text-slate-300 mt-1">Head straight to your current week and lessons.</p>
        <Link to="/roadmap" className="mt-4 inline-block text-sm text-cyan-300">
          Continue learning →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
