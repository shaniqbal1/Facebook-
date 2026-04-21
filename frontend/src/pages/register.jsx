import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: ""
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      setError("All fields are required");
      triggerShake();
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );

      // ✅ SUCCESS MESSAGE YOU WANTED
      setSuccessMsg(
        "User registered successfully. Please verify your email to login."
      );

      // reset form
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        gender: ""
      });

    } catch (err) {
      triggerShake();

      const msg =
        err.response?.data?.message ||
        "Something went wrong";

      setError(msg);
    }
  };

  return (
    <motion.div
      animate={shake ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="bg-white p-6 rounded-lg w-[420px] shadow-md">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center mb-4">
          Create Account
        </h2>

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <div className="bg-green-100 text-green-700 text-sm p-2 rounded mb-2">
            {successMsg}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-2">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3">

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* GENDER */}
          <div className="flex gap-2">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="flex-1 border p-2 rounded text-center">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                />{" "}
                {g}
              </label>
            ))}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded font-bold"
          >
            Sign Up
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-blue-500"
          >
            Login
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;