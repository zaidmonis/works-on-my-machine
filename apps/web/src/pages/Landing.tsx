import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">Works on my Machine</h1>
        <div className="flex gap-3">
          <Link to="/login" className="text-sm text-slate-300 hover:text-cyan-300">
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm bg-cyan-500 text-slate-900 px-4 py-2 rounded hover:bg-cyan-400"
          >
            Sign up
          </Link>
        </div>
      </header>
      <main className="flex-1 px-8 py-16 max-w-5xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-semibold leading-tight">
              Learn JavaScript + React with guided paths, projects, and a built-in playground.
            </h2>
            <p className="mt-4 text-slate-300">
              Choose a 4, 8, or 12-week plan and get structured lessons, real-world projects, and
              progress tracking built for beginners.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/signup"
                className="bg-cyan-500 text-slate-900 px-5 py-3 rounded font-semibold"
              >
                Start learning
              </Link>
              <Link
                to="/login"
                className="border border-slate-700 px-5 py-3 rounded text-slate-200"
              >
                I already have an account
              </Link>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold">What you get</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>✅ 4 structured learning phases</li>
              <li>✅ 3 selectable schedules</li>
              <li>✅ Embedded quizzes + exercises</li>
              <li>✅ In-app JS/TS playground</li>
              <li>✅ Project guides and checklists</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
