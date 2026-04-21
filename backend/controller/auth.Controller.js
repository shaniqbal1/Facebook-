import User from "../modle/userModle.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {sendEmail} from "../utils/send-email.js";

// ========================
// REGISTER
// ========================
export const register = async (req, res) => {
  try {
    const { name, username, email, password, gender } = req.body;

    // ========================
    // VALIDATION
    // ========================
    if (!name || !username || !email || !password || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ========================
    // CHECK EMAIL EXISTS
    // ========================
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ========================
    // CHECK USERNAME EXISTS
    // ========================
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    // ========================
    // HASH PASSWORD
    // ========================
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ========================
    // VERIFICATION TOKEN
    // ========================
    const token = crypto.randomBytes(32).toString("hex");

    // ========================
    // CREATE USER
    // ========================
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      gender,
      verificationToken: token,
      isVerified: false,
    });

    await newUser.save();

    // ========================
    // VERIFY LINK
    // ========================
    const verifyLink = `http://localhost:8000/api/auth/verify/${token}`;

    const emailHtml = `
      <div style="font-family: Arial; padding:20px;">
        <h2>Welcome ${name} 👋</h2>
        <p>Verify your account:</p>

        <a href="${verifyLink}" style="padding:10px 20px; background:#4f46e5; color:white; text-decoration:none;">
          Verify Account
        </a>

        <p>${verifyLink}</p>
      </div>
    `;

    await sendEmail(email, "Verify your account", emailHtml);

    return res.status(201).json({
      success: true,
      message: "User registered. Please verify your email.",
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ========================
// VERIFY EMAIL
// ========================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
  console.log("REGISTER ERROR:", err);

  return res.status(500).json({
    success: false,
    message: "Server error",
    error: err.message,
  });
}
};


// ========================
// LOGIN
// ========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // check email verification
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};