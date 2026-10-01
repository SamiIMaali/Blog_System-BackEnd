/*
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    if (!username || !email || !password || !firstName || !lastName)
      return res.status(400).json({ message: 'All fields are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({
     username,
     email,
     password,
     firstName,
     lastName
    });
    
    const token = signToken(user._id);
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken(user._id);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


adding logging here below to check and noticing all changes
remove  all this code written below after fixing problems
*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// here is update to log all transactions which i face
//---------------------------------------------------
const signToken = (userId) => {
  console.log("🔑 JWT generation started");
  console.log("User ID:", userId);
  console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  console.log("✅ JWT generated successfully");
  console.log("Token exists:", !!token);

  return token;
};
//---------------------------------------------------
// logging problems to noticed where errors happening

exports.register = async (req, res) => {
  console.log("=================================");
  console.log("🟢 REGISTER STARTED");
  console.log("Request body:", {
    ...req.body,
    password: req.body.password ? "[RECEIVED]" : "[MISSING]"
  });
  console.log("=================================");

  try {
    console.log(`REGISTER REQUEST BODY: ${req.body}`);

    const {
      username,
      email,
      password,
      firstName,
      lastName
    } = req.body;

    console.log("1️⃣ Extracted data:");
    console.log({
      username,
      email,
      firstName,
      lastName,
      passwordReceived: !!password
    });

    console.log("2️⃣ Checking required fields...");

    if (!username || !email || !password || !firstName || !lastName) {
      console.log("❌ Missing required field");

      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    console.log("3️⃣ Checking existing user...");

    const existing = await User.findOne({
      $or: [
        { email },
        { username }
      ]
    });

    console.log("4️⃣ Existing user result:", existing);

    if (existing) {
      console.log("❌ User already exists");

      return res.status(400).json({
        message: 'Email or username already registered'
      });
    }

    console.log("5️⃣ Creating new user...");

    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName
    });

    console.log("6️⃣ USER CREATED SUCCESSFULLY");
    console.log("Created user ID:", user._id);
    console.log("Created user email:", user.email);
    console.log("Created username:", user.username);

    console.log("7️⃣ Generating JWT...");

    const token = signToken(user._id);

    console.log("8️⃣ JWT GENERATED");
    console.log("Token exists:", !!token);

    console.log("9️⃣ Sending response...");

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("=================================");
    console.error("❌ REGISTER ERROR");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Error stack:", err.stack);
    console.error("=================================");

    return res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = signToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      message: 'Server error'
    });
  }
};
