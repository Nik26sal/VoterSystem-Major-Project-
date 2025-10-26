import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = {
    id: id,
    role: "admin", //voter or admin
  };

  useEffect(() => {
    if (user.role === "admin") {
      navigate(`/dashboard/AdminDashboard/${user.id}`);
    } else if (user.role === "voter") {
      navigate(`/dashboard/VoterDashboard/${user.id}`);
    }
  }, [user.role, user.id, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600">
      Redirecting to your dashboard...
    </div>
  );
};

export default Dashboard;
