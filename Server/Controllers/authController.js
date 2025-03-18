// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel"); // User model
const dotenv = require("dotenv");

dotenv.config();

// Registration handler
const registerUser = async (req, res) => {
  const { fullName, email, password, role, preferences } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Full name, email, and password are required" });
  }

  // const emailRegex = /\S+@\S+\.\S+/;
  // if (!emailRegex.test(email)) {
  //   return res.status(400).json({ message: 'Invalid email format' });
  // }

  // if (password.length < 8) {
  //   return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  // }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: role || "reader",
      preferences: preferences || [],
    });

    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login handler
// controllers/authController.js
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" } // Token expires in 1 hour
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// دالة لفك التوكن
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // يحتوي على _id و email و role
  } catch (error) {
    throw new Error("توكن غير صالح");
  }
};
module.exports = { registerUser, loginUser, verifyToken };
