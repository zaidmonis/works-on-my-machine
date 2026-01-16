import React from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

const Projects: React.FC = () => {
  const [projects, setProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    api.get("/projects").then((response) => setProjects(response.data.projects));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <p className="text-sm text-slate-400 mt-2">Phase: {project.phase.title}</p>
            <Link to={`/project/${project.id}`} className="text-cyan-300 text-sm mt-4 inline-block">
              View project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
