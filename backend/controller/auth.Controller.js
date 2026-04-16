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
    const { name, email, password, gender } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create verification token
    const token = crypto.randomBytes(32).toString("hex");

    // create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender, // ✅ ADD THIS
      verificationToken: token,
      isVerified: false,
    });

    await newUser.save();

    // verification link
    const verifyLink = `http://localhost:8000/api/auth/verify/${token}`;

    // email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:10px;">

          <h2 style="color:#333;">Welcome, ${name} 👋</h2>

          <p style="color:#555; font-size:16px;">
            Thanks for registering. Please verify your email to activate your account.
          </p>

          <p style="color:#666;">
            Gender selected: <b>${gender}</b>
          </p>

          <div style="text-align:center; margin:30px 0;">
            <a href="${verifyLink}"
               style="
                 background:#4f46e5;
                 color:white;
                 padding:12px 25px;
                 text-decoration:none;
                 border-radius:6px;
                 font-size:16px;
                 display:inline-block;
               ">
              Verify Account
            </a>
          </div>

          <p style="font-size:12px; color:#999;">
            If button not working, copy link below:
          </p>

          <p style="font-size:12px; word-break:break-all;">
            ${verifyLink}
          </p>

        </div>
      </div>
    `;

    // send email
    await sendEmail(email, "Verify your account", emailHtml);

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
    });

  } catch (err) {
    console.error(err);
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