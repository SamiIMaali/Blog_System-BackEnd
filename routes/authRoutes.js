/*welcome here in route authetication file for java script*
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;
------------------------------------------------------------------------------------------
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

//router.post('/register', register);
router.post("/register", (req, res, next) => {
  console.log("✅ /register route reached");
  console.log("Request body:", {
   ...req.body,
   password: req.body.password ? "[RECEIVED]" : "[MISSING]"
  });

  next();
}, register);
router.post('/login', login);

module.exports = router;
------------------------------------------------------------------------------------------
*/
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
