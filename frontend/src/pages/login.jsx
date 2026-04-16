import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  // state
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // handle input change (FIXED)
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // login function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        credentials
      );

      // save token
      localStorage.setItem('token', response.data.token);

      alert("Welcome back to Nexus!");

      // redirect to dashboard
      window.location.href = "/dashboard";

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 w-full"
    >
      <form onSubmit={handleLogin} className="flex flex-col gap-4">

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email address or mobile number"
          required
          onChange={handleChange}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all text-xl shadow-md active:scale-[0.98]"
        >
          Log In
        </button>

      </form>

      {/* extra links */}
      <a href="#" className="text-blue-600 text-sm text-center hover:underline">
        Forgotten password?
      </a>

      <hr className="my-2 border-gray-200" />
    </motion.div>
  );
};

export default Login;