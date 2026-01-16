import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import { PlaygroundProvider } from "./lib/playground";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PlanSelect from "./pages/PlanSelect";
import Roadmap from "./pages/Roadmap";
import PhaseDetail from "./pages/PhaseDetail";
import WeekDetail from "./pages/WeekDetail";
import LessonDetail from "./pages/LessonDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Playground from "./pages/Playground";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isGuest } = useAuth();
  if (loading) {
    return <div className="p-8">Loading...</div>;
  }
  if (!user && !isGuest) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <PlaygroundProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plan/select" element={<PlanSelect />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/phase/:phaseId" element={<PhaseDetail />} />
            <Route path="/week/:weekId" element={<WeekDetail />} />
            <Route path="/lesson/:lessonId" element={<LessonDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PlaygroundProvider>
    </AuthProvider>
  );
};

export default App;
