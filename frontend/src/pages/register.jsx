import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: ""
  });

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/register", formData);

      setSuccessMsg("User registered successfully. Please verify your email.");

      // ✅ RESET FORM HERE (IMPORTANT FIX)
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        gender: ""
      });

      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // auto hide success message
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  return (
    <div className="bg-white rounded-lg w-[396px] shadow-lg">
      <form onSubmit={handleRegister} className="p-4 space-y-3">

        {successMsg && (
          <div className="bg-green-100 text-green-700 text-sm p-2 rounded">
            {successMsg}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded">
            {error}
          </div>
        )}

        {/* IMPORTANT: ADD value={formData.x} */}
        <input
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded"
        />

        <input
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded"
        />

        <input
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded"
        />

        <div className="relative">
          <input
            name="password"
            value={formData.password}
            type={showPw ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded"
          />

          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-3 text-blue-500 text-sm"
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex gap-2">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            /> Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            /> Female
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
            /> Other
          </label>
        </div>

        <button className="w-full bg-blue-500 text-white py-3 rounded">
          {loading ? "..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center py-4">
        <button onClick={switchToLogin} className="text-blue-500 text-sm">
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default Register;