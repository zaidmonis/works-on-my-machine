import React from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

const Sidebar: React.FC = () => {
  const [roadmap, setRoadmap] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    api.get("/roadmap").then((response) => setRoadmap(response.data.phases));
  }, []);

  const filteredRoadmap = roadmap.map((phase) => {
    const lessons = phase.lessons.filter((lesson: any) =>
      `${lesson.title} ${lesson.contentMarkdown ?? \"\"}`.toLowerCase().includes(search.toLowerCase())
    );
    return { ...phase, lessons };
  });

  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-900 hidden lg:flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-semibold">Works on my Machine</h1>
        <p className="text-xs text-slate-400 mt-1">Beginner-friendly JS + React course</p>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search lessons"
          className="mt-4 w-full rounded bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {filteredRoadmap.map((phase) => (
          <div key={phase.id}>
            <Link to={`/phase/${phase.id}`} className="text-sm font-semibold text-cyan-300">
              {phase.title}
            </Link>
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              {phase.lessons.slice(0, 6).map((lesson: any) => (
                <li key={lesson.id}>
                  <Link to={`/lesson/${lesson.id}`} className="hover:text-cyan-200">
                    {lesson.title}
                  </Link>
                </li>
              ))}
              {phase.lessons.length > 6 && (
                <li className="text-slate-500">+ {phase.lessons.length - 6} more</li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
        <p>Stay consistent. Track your progress each week.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
