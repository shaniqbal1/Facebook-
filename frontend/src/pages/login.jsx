import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Login = ({ switchToRegister }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      triggerShake();
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", credentials);
      localStorage.setItem("token", res.data.token);
      setSuccess(true);
      setTimeout(() => (window.location.href = "/dashboard"), 800);
    } catch (err) {
      setLoading(false);
      triggerShake();
      alert(err.response?.data?.message || "Login failed");
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
        <form onSubmit={handleLogin} className="p-4 space-y-3">
          {/* Floating label – email */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="text"
              placeholder=" "
              autoComplete="email"
              onChange={handleChange}
              className="peer w-full px-4 pt-[22px] pb-[6px] border border-[#dddfe2] rounded-[6px] text-[17px] text-[#1c1e21] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_3px_rgba(24,119,242,0.3),0_0_0_2px_#e7f3ff] transition-all placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-[#90949c] pointer-events-none transition-all duration-150
                peer-focus:top-[8px] peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#1877f2]
                peer-[:not(:placeholder-shown)]:top-[8px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
            >
              Email address or mobile number
            </label>
          </div>

          {/* Floating label – password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              placeholder=" "
              autoComplete="current-password"
              onChange={handleChange}
              className="peer w-full px-4 pt-[22px] pb-[6px] pr-[64px] border border-[#dddfe2] rounded-[6px] text-[17px] text-[#1c1e21] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_3px_rgba(24,119,242,0.3),0_0_0_2px_#e7f3ff] transition-all placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-[#90949c] pointer-events-none transition-all duration-150
                peer-focus:top-[8px] peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#1877f2]
                peer-[:not(:placeholder-shown)]:top-[8px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1877f2] text-[13px] font-semibold hover:text-[#166fe5] transition-colors"
            >
              {showPw ? "👁️" : "🙈"}
            </button>
          </div>

          {/* Login button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            animate={success ? { scale: [1, 1.05, 1], boxShadow: ["0 0 0 0 rgba(66,183,42,0.7)", "0 0 0 10px rgba(66,183,42,0)", "0 0 0 0 rgba(66,183,42,0)"] } : {}}
            transition={success ? { duration: 1.5, repeat: Infinity } : {}}
            className={`w-full text-white text-[20px] font-bold py-3 rounded-[6px] transition-all ${
              success
                ? "bg-[#42b72a]"
                : "bg-[#1877f2] hover:bg-[#166fe5]"
            }`}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.span
                  key="ok"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="inline-block"
                >
                  ✓ Logging in…
                </motion.span>
              ) : loading ? (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  …
                </motion.span>
              ) : (
                <motion.span key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Log in
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <div className="px-4 text-center">
          <a href="#" className="text-[#1877f2] text-[14px] font-medium hover:underline">
            Forgotten password?
          </a>
        </div>

        <hr className="border-[#dadde1] mx-4 my-5" />

        <div className="text-center pb-5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={switchToRegister}
            className="bg-[#42b72a] hover:bg-[#36a420] text-white text-[17px] font-bold px-5 py-3 rounded-[6px] transition-colors"
          >
            Create new account
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;