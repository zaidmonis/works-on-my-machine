import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error?.message ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-slate-400 mt-2">Login to continue your learning journey.</p>
        <div className="mt-6 space-y-4">
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 bg-slate-800 rounded"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            className="w-full px-4 py-2 bg-slate-800 rounded"
          />
        </div>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        <button
          type="submit"
          className="w-full mt-6 bg-cyan-500 text-slate-900 py-2 rounded font-semibold"
        >
          Login
        </button>
        <p className="mt-4 text-xs text-slate-400">
          New here? <Link to="/signup" className="text-cyan-300">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
