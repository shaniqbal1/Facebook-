import { useState } from "react";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

export default function App() {
  const [page, setPage] = useState("login"); // "login" | "register"

  return page === "login" ? (
    <Register onSwitchToLogin={() => setPage("login")} />
  ) : (
    <Login onSwitchToRegister={() => setPage("register")} />
  );
}