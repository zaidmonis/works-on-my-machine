import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const plans = [
  {
    id: "W4",
    title: "4-week intensive",
    description: "One phase per week for fast learners."
  },
  {
    id: "W8",
    title: "8-week balanced",
    description: "Two weeks per phase for solid practice."
  },
  {
    id: "W12",
    title: "12-week standard",
    description: "Three weeks per phase for deeper mastery."
  }
];

const PlanSelect: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSelect = async (plan: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/plan/select", { plan });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error?.message ?? "Could not select plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Choose your learning plan</h1>
      <p className="text-slate-400 mt-2">All plans cover the same content with a different pace.</p>
      {error && <p className="text-red-400 mt-4">{error}</p>}
      <div className="grid gap-4 mt-6 md:grid-cols-3">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => void handleSelect(plan.id)}
            disabled={loading}
            className="text-left bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-400"
          >
            <h3 className="text-lg font-semibold">{plan.title}</h3>
            <p className="text-sm text-slate-400 mt-2">{plan.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanSelect;
