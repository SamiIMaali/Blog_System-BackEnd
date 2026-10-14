/*
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// =====================================================
// JWT GENERATION
// =====================================================

const signToken = (userId) => {

  console.log("========================================");
  console.log("🔑 JWT GENERATION STARTED");
  console.log("User ID:", userId);

  console.log(
    "JWT_SECRET exists:",
    !!process.env.JWT_SECRET
  );

  console.log(
    "JWT_SECRET type:",
    typeof process.env.JWT_SECRET
  );

  console.log("========================================");


  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  );


  console.log("========================================");
  console.log("✅ JWT GENERATED SUCCESSFULLY");
  console.log("Token exists:", !!token);
  console.log("========================================");


  return token;
};


// =====================================================
// REGISTER
// =====================================================

exports.register = async (req, res) => {

  console.log("========================================");
  console.log("🟢 REGISTER CONTROLLER STARTED");
  console.log("========================================");


  try {

    // -------------------------------------------------
    // STEP 1
    // -------------------------------------------------

    console.log("1️⃣ Reading request body...");

    const {
      username,
      email,
      password,
      firstName,
      lastName
    } = req.body;


    // -------------------------------------------------
    // STEP 2
    // -------------------------------------------------

    console.log("2️⃣ Request data extracted:");

    console.log({
      username,
      email,
      firstName,
      lastName,

      // Do NOT print actual password
      passwordReceived: !!password
    });


    // -------------------------------------------------
    // STEP 3
    // -------------------------------------------------

    console.log("3️⃣ Checking required fields...");


    if (
      !username ||
      !email ||
      !password ||
      !firstName ||
      !lastName
    ) {

      console.log("❌ REQUIRED FIELD MISSING");

      return res.status(400).json({
        message: 'All fields are required'
      });
    }


    console.log("✅ All required fields exist");


    // -------------------------------------------------
    // STEP 4
    // -------------------------------------------------

    console.log(
      "4️⃣ Checking if user already exists..."
    );


    const existing = await User.findOne({
      $or: [
        { email },
        { username }
      ]
    });


    // -------------------------------------------------
    // STEP 5
    // -------------------------------------------------

    console.log(
      "5️⃣ Existing user check completed"
    );

    console.log(
      "User already exists:",
      !!existing
    );


    if (existing) {

      console.log("❌ USER ALREADY EXISTS");

      return res.status(400).json({
        message: 'Email or username already registered'
      });
    }


    console.log("✅ User does not already exist");


    // -------------------------------------------------
    // STEP 6
    // -------------------------------------------------

    console.log("6️⃣ Creating new user...");


    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName
    });


    // -------------------------------------------------
    // STEP 7
    // -------------------------------------------------

    console.log("========================================");
    console.log("✅ USER CREATED SUCCESSFULLY");
    console.log("User ID:", user._id);
    console.log("Username:", user.username);
    console.log("Email:", user.email);
    console.log("========================================");


    // -------------------------------------------------
    // STEP 8
    // -------------------------------------------------

    console.log("7️⃣ Generating JWT...");


    const token = signToken(user._id);


    // -------------------------------------------------
    // STEP 9
    // -------------------------------------------------

    console.log("8️⃣ JWT generation completed");

    console.log(
      "Token exists:",
      !!token
    );


    // -------------------------------------------------
    // STEP 10
    // -------------------------------------------------

    console.log(
      "9️⃣ Preparing successful response..."
    );


    const responseData = {
      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    };


    // -------------------------------------------------
    // STEP 11
    // -------------------------------------------------

    console.log(
      "🔟 Sending successful register response..."
    );


    return res.status(201).json(responseData);

  } catch (err) {

    // -------------------------------------------------
    // ERROR
    // -------------------------------------------------

    console.error("========================================");
    console.error("❌ REGISTER CONTROLLER ERROR");
    console.error("========================================");

    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Error stack:", err.stack);

    console.error("========================================");


    return res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};


// =====================================================
// LOGIN
// =====================================================

exports.login = async (req, res) => {

  console.log("========================================");
  console.log("🟣 LOGIN CONTROLLER STARTED");
  console.log("========================================");


  try {

    console.log("1️⃣ Reading login request...");


    const {
      email,
      password
    } = req.body;


    console.log("Login data:", {
      email,
      passwordReceived: !!password
    });


    // -------------------------------------------------
    // REQUIRED FIELDS
    // -------------------------------------------------

    console.log("2️⃣ Checking login required fields...");


    if (!email || !password) {

      console.log(
        "❌ LOGIN REQUIRED FIELD MISSING"
      );

      return res.status(400).json({
        message: 'Email and password required'
      });
    }


    // -------------------------------------------------
    // FIND USER
    // -------------------------------------------------

    console.log("3️⃣ Searching for user...");


    const user = await User.findOne({
      email
    });


    console.log(
      "User found:",
      !!user
    );


    if (!user) {

      console.log("❌ USER NOT FOUND");

      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }


    // -------------------------------------------------
    // PASSWORD CHECK
    // -------------------------------------------------

    console.log("4️⃣ Comparing password...");


    const match = await bcrypt.compare(
      password,
      user.password
    );


    console.log(
      "Password match:",
      match
    );


    if (!match) {

      console.log(
        "❌ PASSWORD DOES NOT MATCH"
      );

      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }


    // -------------------------------------------------
    // JWT
    // -------------------------------------------------

    console.log("5️⃣ Generating login JWT...");


    const token = signToken(user._id);


    console.log("✅ LOGIN SUCCESS");


    return res.json({
      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });


  } catch (err) {

    console.error("========================================");
    console.error("❌ LOGIN CONTROLLER ERROR");
    console.error("========================================");

    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Error stack:", err.stack);

    console.error("========================================");


    return res.status(500).json({
      message: 'Server error'
    });
  }
};
*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// =====================================================
// GENERATE JWT
// =====================================================

const signToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(
    { id: userId.toString() },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// =====================================================
// REGISTER
// POST /api/auth/register
// =====================================================

exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
    } = req.body || {};

    // Validate required fields and data types.
    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string'
    ) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();

    if (
      !normalizedUsername ||
      !normalizedEmail ||
      !password ||
      !normalizedFirstName ||
      !normalizedLastName
    ) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check whether the username or email is already registered.
    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { username: normalizedUsername },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'Email or username already registered',
      });
    }

    // The User model hashes the password before saving.
    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
    });

    const token = signToken(user._id);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    // A unique index can reject simultaneous duplicate registrations.
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Email or username already registered',
      });
    }

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Invalid registration data',
      });
    }

    console.error('Registration failed:', err.name || 'Error');

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    // Use the same message for an unknown email and a wrong password.
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login failed:', err.name || 'Error');

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
