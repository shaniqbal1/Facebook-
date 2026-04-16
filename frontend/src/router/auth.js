// const express = from "express";
// const router = express.Router();
// const User = require('../models/User'); // Your MongoDB User model

// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password, gender } = req.body;

//     // Check if user exists
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     // Create new user
//     user = new User({ name, email, password, gender });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;