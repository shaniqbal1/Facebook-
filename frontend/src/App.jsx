import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import AuthPage from "./pages/authPage.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Profile from "./pages/userProfile.jsx";

// Import NexusLayout component (if it's in the 'components' folder)
import NexusLayout from "./component/nexusLayout.jsx";

function App() {
  // Mock user data, you can replace it with real user data once authentication is integrated
  const user = {
    name: "John Doe",
    username: "johndoe",
    avatar: null, // You can add avatar URL if you want
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH PAGES */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD PAGE with NexusLayout */}
        <Route path="/dashboard" element={
          <NexusLayout user={user}>
            <Dashboard />
          </NexusLayout>
        } />

        {/* PROFILE PAGE with NexusLayout */}
        <Route path="/profile" element={
          <NexusLayout user={user}>
            <Profile />
          </NexusLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;