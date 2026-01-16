import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../lib/auth";

const AppLayout: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-slate-800 px-4 py-2 rounded"
        >
          Skip to content
        </a>
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <nav className="flex gap-4 text-sm">
            <NavLink to="/dashboard" className="hover:text-cyan-300">
              Dashboard
            </NavLink>
            <NavLink to="/roadmap" className="hover:text-cyan-300">
              Roadmap
            </NavLink>
            <NavLink to="/projects" className="hover:text-cyan-300">
              Projects
            </NavLink>
            <NavLink to="/playground" className="hover:text-cyan-300">
              Playground
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">{user?.username}</span>
            <button
              onClick={() => void logout()}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sm"
            >
              Logout
            </button>
            <NavLink to="/profile" className="text-sm text-slate-300 hover:text-cyan-300">
              Profile
            </NavLink>
          </div>
        </header>
        <main id="main" className="flex-1 px-6 py-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
