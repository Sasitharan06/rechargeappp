const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "374721240924-qebgmqsp1v63pevlovam76i6dce9g58s.apps.googleusercontent.com");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret_should_change", {
    expiresIn: "30d",
  });
};

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE user (Signup)
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GOOGLE LOGIN
exports.googleLogin = async (req, res) => {
  const { token } = req.body; // Expecting { token: "..." } from frontend

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID || "374721240924-qebgmqsp1v63pevlovam76i6dce9g58s.apps.googleusercontent.com",
    });

    const { name, email, sub } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists, return token
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      // User doesn't exist, create new
      // Note: Phone number is required by model, but Google doesn't always provide it. 
      // We'll use a placeholder or handle it. Here using a random placeholder or just empty if validation allows.
      // Since phone is required and unique, we need a strategy. 
      // Strategy: Use Google ID as a placeholder phone or empty string if validation allows.
      // Better strategy: Generate a random string or ask user later. 
      // For now, I'll use the 'sub' (Google ID) as a placeholder phone to satisfy unique/required constraint if possible, 
      // OR relax the constraint. Let's try using a prefix.
      const randomPhone = "G-" + sub.substring(0, 10);

      user = await User.create({
        name,
        email,
        password: await require("bcryptjs").hash(Math.random().toString(36), 10), // Random password
        phone: randomPhone,
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    console.error("Google verify error:", err);
    res.status(401).json({ error: "Invalid Google Token" });
  }
};
