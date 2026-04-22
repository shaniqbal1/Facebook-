import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      setError("All fields are required");
      triggerShake();
      setLoading(false);
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
      setLoading(false);

      // reset form
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        gender: ""
      });

    } catch (err) {
      setLoading(false);
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
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
        className="bg-white rounded-lg w-[396px]"
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,.1), 0 8px 16px rgba(0,0,0,.1)" }}
      >
        <form onSubmit={handleRegister} className="p-4 space-y-3">
          
          {/* NAME */}
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              className="peer w-full px-4 pt-[22px] pb-[6px] border border-[#dddfe2] rounded-[6px] text-[17px] text-[#1c1e21] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff] focus:transition-all placeholder-transparent"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-[#90949c] pointer-events-none transition-all duration-150 peer-focus:top-[8px] peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#1877f2] peer-[:not(:placeholder-shown)]:top-[8px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
            >
              Full Name
            </label>
          </div>

          {/* USERNAME */}
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              placeholder=" "
              value={formData.username}
              onChange={handleChange}
              className="peer w-full px-4 pt-[22px] pb-[6px] border border-[#dddfe2] rounded-[6px] text-[17px] text-[#1c1e21] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff] transition-all placeholder-transparent"
            />
            <label
              htmlFor="username"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-[#90949c] pointer-events-none transition-all duration-150 peer-focus:top-[8px] peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#1877f2] peer-[:not(:placeholder-shown)]:top-[8px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
            >
              Username
            </label>
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              className="peer w-full px-4 pt-[22px] pb-[6px] border border-[#dddfe2] rounded-[6px] text-[17px] text-[#1c1e21] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff] transition-all placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-[#90949c] pointer-events-none transition-all duration-150 peer-focus:top-[8px] peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#1877f2] peer-[:not(:placeholder-shown)]:top-[8px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
            >
              Email
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              className="peer w-full px-4 pt-[22px] pb-[6px] pr-[64px] border border-[#dddfe2] rounded-[6px] text-[17px] text-[#1c1e21] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff] transition-all placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-[#90949c] pointer-events-none transition-all duration-150 peer-focus:top-[8px] peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#1877f2] peer-[:not(:placeholder-shown)]:top-[8px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1877f2] text-[13px] font-semibold"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          {/* GENDER */}
          <div className="flex gap-2 p-1 bg-[#f5f6f6] rounded-[10px]">
            {["male", "female", "other"].map((g) => (
              <label key={g} className={`flex-1 px-3 py-2.5 rounded-full text-center text-sm font-semibold cursor-pointer transition-all ${formData.gender === g ? 'bg-[#1877f2] text-white shadow-lg' : 'text-[#65676b] hover:bg-[#e4e6ea]'}`}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                  className="hidden"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          {/* SUCCESS/ERROR */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#42b72a]/10 text-[#42b72a] text-sm p-3 rounded-[6px] border border-[#42b72a]/30 flex items-center gap-2"
              >
                <span className="text-lg">✓</span>
                {successMsg}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-100/80 text-red-700 text-sm p-3 rounded-[6px] border border-red-200 flex items-center gap-2"
              >
                <span className="text-lg">⚠</span>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* BUTTON */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className={`w-full text-white text-[20px] font-bold py-3 rounded-[6px] transition-all ${loading ? 'bg-[#42b72a]' : 'bg-[#1877f2] hover:bg-[#166fe5]'}`}
          >
            {loading ? (
              <span>…</span>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        <div className="px-4 text-center pt-3 pb-4">
          <hr className="border-[#dadde1] mx-4 my-4" />
          <p className="text-[14px] text-[#65676b]">
            Already have an account?{" "}
            <button
              onClick={switchToLogin}
              className="text-[#1877f2] font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;