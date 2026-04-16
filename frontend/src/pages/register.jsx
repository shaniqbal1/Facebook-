import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: ''
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // register request
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/register',
        formData
      );

      alert("Registration Successful!");
      console.log(response.data);

      // optional redirect
      // window.location.href = "/login";

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">

      {/* NAME */}
      <input
        name="name"
        type="text"
        placeholder="Full Name"
        className="p-3 border rounded-lg"
        required
        onChange={handleChange}
      />

      {/* EMAIL */}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="p-3 border rounded-lg"
        required
        onChange={handleChange}
      />

      {/* PASSWORD */}
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="p-3 border rounded-lg"
        required
        onChange={handleChange}
      />

      {/* GENDER */}
      <div className="flex gap-2">
        {['male', 'female', 'other'].map((g) => (
          <label
            key={g}
            className="flex-1 border p-2 rounded-lg flex justify-between items-center"
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}

            <input
              type="radio"
              name="gender"
              value={g}
              onChange={handleChange}
              checked={formData.gender === g}
            />
          </label>
        ))}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition"
      >
        Sign Up
      </button>

    </form>
  );
};

export default Register;