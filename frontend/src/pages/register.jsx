import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const strengthConfig = [
  null,
  { label: "Weak", color: "#e74c3c", width: "25%" },
  { label: "Fair", color: "#f39c12", width: "50%" },
  { label: "Good", color: "#2ecc71", width: "75%" },
  { label: "Strong", color: "#27ae60", width: "100%" },
];

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", gender: "" });
  const [showPw, setShowPw] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pwStrength, setPwStrength] = useState(0);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (e.target.name === "password") setPwStrength(getStrength(e.target.value));
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.gender) {
      triggerShake();
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/auth/register", formData);
      setSuccess(true);
      setTimeout(() => switchToLogin(), 900);
    } catch (err) {
      triggerShake();
      alert(err.response?.data?.message || "Register failed");
    }
  };

  const sc = strengthConfig[pwStrength];

  return (
    <motion.div
      animate={shake ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
        className="bg-white rounded-lg w-[432px]"
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,.1), 0 8px 16px rgba(0,0,0,.1)" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center px-4 pt-4"
        >
          <h2 className="text-[25px] font-bold text-[#1c1e21]">Create a new account</h2>
          <p className="text-[#606770] text-[15px] mt-1">It's quick and easy.</p>
        </motion.div>

        <hr className="border-[#dadde1] mx-4 mt-4" />

        <form onSubmit={handleRegister} className="p-4 space-y-3">

          {/* Full name */}
          <motion.input
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            name="name"
            type="text"
            placeholder="Full name"
            required
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-[#ccd0d5] rounded-[5px] text-[15px] text-[#1c1e21] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff] focus:bg-white transition-all placeholder-[#8d949e]"
          />

          {/* Email */}
          <motion.input
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            name="email"
            type="email"
            placeholder="Mobile number or email address"
            required
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-[#ccd0d5] rounded-[5px] text-[15px] text-[#1c1e21] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff] focus:bg-white transition-all placeholder-[#8d949e]"
          />

          {/* Password + strength */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <input
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="New password"
                required
                onChange={handleChange}
                className="w-full px-3 py-2.5 pr-14 border border-[#ccd0d5] rounded-[5px] text-[15px] text-[#1c1e21] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff] focus:bg-white transition-all placeholder-[#8d949e]"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1877f2] text-[12px] font-semibold"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password strength bar */}
            <AnimatePresence>
              {formData.password && sc && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1.5 overflow-hidden"
                >
                  <div className="h-[3px] w-full bg-[#e4e6eb] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: sc.width, backgroundColor: sc.color }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-[11px] mt-0.5" style={{ color: sc.color }}>{sc.label} password</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Gender */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="text-[#606770] text-[12px] font-medium block mb-1.5">Gender</label>
            <div className="flex gap-2">
              {["Female", "Male", "Custom"].map((g) => (
                <label
                  key={g}
                  className="flex-1 flex items-center justify-between border border-[#ccd0d5] rounded-[4px] px-3 py-2 cursor-pointer hover:bg-[#f5f6f7] transition-colors has-[:checked]:border-[#1877f2] has-[:checked]:bg-[#e7f3ff]"
                >
                  <span className="text-[15px] text-[#1c1e21]">{g}</span>
                  <input
                    type="radio"
                    name="gender"
                    value={g.toLowerCase()}
                    required
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#1877f2]"
                  />
                </label>
              ))}
            </div>
          </motion.div>

          {/* Sign Up button */}
          <div className="text-center pt-2">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className={`text-white text-[18px] font-bold px-8 py-2 rounded-[6px] transition-colors ${
                success ? "bg-[#27ae60]" : "bg-[#00a400] hover:bg-[#008f00]"
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
                    ✓ Done!
                  </motion.span>
                ) : (
                  <motion.span key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Sign Up
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </form>

        <div className="text-center pb-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); switchToLogin(); }}
            className="text-[#1877f2] text-[17px] font-medium hover:underline"
          >
            Already have an account?
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;