import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") {
      navigate("/dashboard/AdminDashboard", { replace: true });
    } else if (user.role === "voter") {
      navigate("/dashboard/VoterDashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600">
      Redirecting to your dashboard...
    </div>
  );
};

export default Dashboard;
