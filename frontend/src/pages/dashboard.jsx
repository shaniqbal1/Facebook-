import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Welcome to Dashboard 🎉</h1>
    </div>
  );
};

export default Dashboard;