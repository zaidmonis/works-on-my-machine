import React from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

const Roadmap: React.FC = () => {
  const [phases, setPhases] = React.useState<any[]>([]);

  React.useEffect(() => {
    api.get("/roadmap").then((response) => setPhases(response.data.phases));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Roadmap</h1>
        <p className="text-slate-400 mt-2">Four phases that take you from JS basics to production-ready apps.</p>
      </div>
      <div className="grid gap-4">
        {phases.map((phase) => (
          <div key={phase.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{phase.title}</h2>
                <p className="text-sm text-slate-400 mt-1">{phase.description}</p>
              </div>
              <Link to={`/phase/${phase.id}`} className="text-cyan-300 text-sm">
                View phase
              </Link>
            </div>
            <div className="mt-4 text-sm text-slate-300">
              {phase.lessons.length} lessons · {phase.projects.length} projects
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
