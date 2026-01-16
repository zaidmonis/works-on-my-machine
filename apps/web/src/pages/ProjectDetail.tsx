import React from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import MarkdownRenderer from "../components/MarkdownRenderer";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  const [project, setProject] = React.useState<any | null>(null);
  const [status, setStatus] = React.useState("NOT_STARTED");

  React.useEffect(() => {
    if (!projectId) return;
    api.get(`/projects/${projectId}`).then((response) => setProject(response.data.project));
  }, [projectId]);

  const updateStatus = async (nextStatus: string) => {
    if (!projectId) return;
    setStatus(nextStatus);
    await api.post(`/projects/${projectId}/status`, { status: nextStatus });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{project?.title}</h1>
        <p className="text-slate-400 mt-2">Phase: {project?.phase?.title}</p>
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Overview</h2>
        {project?.descriptionMarkdown && (
          <div className="mt-3 text-sm text-slate-300">
            <MarkdownRenderer content={project.descriptionMarkdown} />
          </div>
        )}
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Build plan checklist</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-300 list-disc list-inside">
          {(project?.checklist ?? []).map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Project status</h2>
        <div className="mt-4 flex gap-2">
          {["NOT_STARTED", "IN_PROGRESS", "DONE"].map((value) => (
            <button
              key={value}
              onClick={() => void updateStatus(value)}
              className={`px-3 py-1 rounded text-xs ${status === value ? "bg-cyan-500 text-slate-900" : "bg-slate-800"}`}
            >
              {value.replace("_", " ")}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
