/*
const express = require('express');

const router = express.Router();

const {
  register,
  login
} = require('../controllers/authController');


// =====================================================
// REGISTER ROUTE
// =====================================================

router.post('/register', (req, res, next) => {

  console.log("========================================");
  console.log("🛣️ REGISTER ROUTE REACHED");

  console.log("Request method:", req.method);
  console.log("Request URL:", req.originalUrl);

  console.log("Request body:", {
    username: req.body?.username,
    email: req.body?.email,
    firstName: req.body?.firstName,
    lastName: req.body?.lastName,

    // Do NOT print actual password
    passwordReceived: !!req.body?.password
  });

  console.log("========================================");

  next();

}, register);


// =====================================================
// LOGIN ROUTE
// =====================================================

router.post('/login', login);


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;
*/

const express = require('express');

const { register, login } = require('../controllers/authController');

const router = express.Router();

// =====================================================
// REGISTER
// POST /api/auth/register
// =====================================================

router.post('/register', register);

// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================

router.post('/login', login);

module.exports = router;
