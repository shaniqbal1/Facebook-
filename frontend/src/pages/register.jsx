import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleButton from "../component/googleauth.jsx"; // ✅ IMPORT

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
    setSuccessMsg("");
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
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8000/api/v1/auth/register", // ✅ FIXED URL
        formData
      );

      setSuccessMsg("User registered successfully. Please verify your email.");

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        gender: ""
      });

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => setSuccessMsg(""), 5000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  return (
    <div className="bg-white rounded-lg w-[396px] shadow-lg p-4 space-y-3">

      {/* 🔥 GOOGLE BUTTON */}
      <GoogleButton />

      {/* divider */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-[1px] bg-gray-300"></div>
        <span className="text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>

      {/* FORM */}
      <form onSubmit={handleRegister} className="space-y-3">

        {/* success */}
        {successMsg && (
          <div className="bg-green-100 text-green-700 text-sm p-2 rounded">
            {successMsg}
          </div>
        )}

        {/* error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded">
            {error}
          </div>
        )}

        {/* name */}
        <input
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded outline-none"
        />

        {/* username */}
        <input
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded outline-none"
        />

        {/* email */}
        <input
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded outline-none"
        />

        {/* password */}
        <div className="relative">
          <input
            name="password"
            value={formData.password}
            type={showPw ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-3 text-blue-500 text-sm"
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>

        {/* gender */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          {["male", "female", "other"].map((g) => (
            <label
              key={g}
              className={`cursor-pointer px-3 py-2 rounded-lg text-center border transition-all
                ${
                  formData.gender === g
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
            >
              <input
                type="radio"
                name="gender"
                value={g}
                checked={formData.gender === g}
                onChange={handleChange}
                className="hidden"
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>

        {/* submit */}
        <button className="w-full bg-blue-500 text-white py-3 rounded">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      {/* switch */}
      <div className="text-center pt-2">
        <button
          onClick={switchToLogin}
          className="text-blue-500 text-sm"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default Register;