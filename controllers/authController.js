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
------------------------------------------------------------------------------------------------------
/

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
---------------------------------------------------
*/
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
