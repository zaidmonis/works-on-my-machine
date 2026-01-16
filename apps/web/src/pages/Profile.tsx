import React from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../lib/auth";

const Profile: React.FC = () => {
  const [exportData, setExportData] = React.useState<string>("");
  const [status, setStatus] = React.useState<string | null>(null);
  const { isGuest } = useAuth();

  if (isGuest) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="text-slate-400 mt-2">
            Guest sessions do not save progress or allow exports.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Create an account</h2>
          <p className="text-sm text-slate-400 mt-2">
            Sign up to persist your progress and unlock exports.
          </p>
          <Link to="/signup" className="mt-4 inline-block text-sm text-cyan-300">
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  const handleExport = async () => {
    const response = await api.get("/progress/export");
    setExportData(JSON.stringify(response.data, null, 2));
  };

  const handleReset = async () => {
    await api.post("/progress/reset");
    setStatus("Progress reset.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="text-slate-400 mt-2">Manage your progress data.</p>
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Export progress</h2>
        <p className="text-sm text-slate-400 mt-2">Download your progress as JSON.</p>
        <button
          onClick={() => void handleExport()}
          className="mt-4 bg-cyan-500 text-slate-900 px-4 py-2 rounded text-sm"
        >
          Export JSON
        </button>
        {exportData && (
          <pre className="mt-4 text-xs bg-slate-800 p-4 rounded overflow-x-auto">{exportData}</pre>
        )}
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Reset progress</h2>
        <p className="text-sm text-slate-400 mt-2">Clear all progress and start over.</p>
        <button
          onClick={() => void handleReset()}
          className="mt-4 bg-red-500 text-slate-900 px-4 py-2 rounded text-sm"
        >
          Reset progress
        </button>
        {status && <p className="mt-3 text-sm text-cyan-300">{status}</p>}
      </section>
    </div>
  );
};

export default Profile;
