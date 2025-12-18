import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const userData = {
    id: id,
    role: user.role,
  };

  useEffect(() => {
    if (userData.role === "admin") {
      navigate(`/dashboard/AdminDashboard/${userData.id}`);
    } else if (userData.role === "voter") {
      navigate(`/dashboard/VoterDashboard/${userData.id}`);
    }
  }, [user.role, user.id, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600">
      Redirecting to your dashboard...
    </div>
  );
};

export default Dashboard;
