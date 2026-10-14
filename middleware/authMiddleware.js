/*
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        message: 'Authentication token is missing'
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');

      return res.status(500).json({
        message: 'Server configuration error'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: 'Invalid authentication token'
      });
    }

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User associated with this token was not found'
      });
    }

    req.user = user;

    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' ||
        err.name === 'TokenExpiredError' ||
        err.name === 'NotBeforeError') {
      return res.status(401).json({
        message: 'Invalid or expired authentication token'
      });
    }

    console.error('Authentication middleware error:', err.message);

    return res.status(500).json({
      message: 'Authentication could not be completed'
    });
  }
};

module.exports = protect;
*/

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');

// =====================================================
// PROTECT ROUTES
// =====================================================

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      typeof authHeader !== 'string' ||
      !authHeader.startsWith('Bearer ')
    ) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        message: 'Authentication token is missing',
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: 'Server configuration error',
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (
      !decoded ||
      typeof decoded.id !== 'string' ||
      !mongoose.isValidObjectId(decoded.id)
    ) {
      return res.status(401).json({
        message: 'Invalid authentication token',
      });
    }

    const user = await User.findById(decoded.id)
      .select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User associated with this token was not found',
      });
    }

    req.user = user;

    return next();
  } catch (err) {
    if (
      err.name === 'JsonWebTokenError' ||
      err.name === 'TokenExpiredError' ||
      err.name === 'NotBeforeError'
    ) {
      return res.status(401).json({
        message: 'Invalid or expired authentication token',
      });
    }

    // Avoid logging token contents or user information.
    console.error(
      'Authentication middleware failed:',
      err.name || 'Error'
    );

    return res.status(500).json({
      message: 'Authentication could not be completed',
    });
  }
};

module.exports = protect;
