import user from '../modle/userModle.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // verification token
    const token = crypto.randomBytes(32).toString("hex");

    user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken: token
    });

    await user.save();

    res.json({ msg: "User registered. Verify email!" });

  } catch (err) {
    res.status(500).send("Server error");
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(400).json({ msg: "Verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ token });

  } catch (err) {
    res.status(500).send("Server error");
  }
};