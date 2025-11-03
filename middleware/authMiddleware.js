/*const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // استخراج التوكن الصحيح
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    }

    return res.status(401).json({ message: "No token, unauthenticated." });
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Token checking failed." });
  }
};

module.exports = protect;
*/
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    }

    return res.status(401).json({ message: 'No token, unauthenticated.' });
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ message: 'Token checking failed.' });
  }
};

module.exports = protect;
