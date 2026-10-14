/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// =====================================================
// CORS
// =====================================================

const allowedOrigins = [
  'http://localhost:5173',
  'https://blog-system-one-phi.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {

    // Allow requests without Origin
    // such as Render health checks / server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ CORS BLOCKED ORIGIN:", origin);

    return callback(new Error('Not allowed by CORS'));
  },

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ]
}));


// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());


// =====================================================
// GLOBAL REQUEST LOGGER
// =====================================================

app.use((req, res, next) => {

  const startTime = Date.now();

  console.log("========================================");
  console.log("📥 INCOMING REQUEST");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Origin:", req.headers.origin);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("========================================");


  // Log when response is completed
  res.on("finish", () => {

    console.log("========================================");
    console.log("📤 RESPONSE FINISHED");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Status:", res.statusCode);
    console.log(
      "Duration:",
      `${Date.now() - startTime}ms`
    );
    console.log("========================================");

  });


  next();
});


// =====================================================
// ROUTES
// =====================================================

console.log("🛣️ Registering API routes...");

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

console.log("✅ API routes registered successfully");


// =====================================================
// ROOT ROUTE
// =====================================================

app.get('/', (req, res) => {

  console.log("🏠 ROOT ROUTE REACHED");

  res.json({
    message: 'Blog System API is running'
  });

});


// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {

  console.log("========================================");
  console.log("❌ 404 ROUTE NOT FOUND");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("========================================");

  res.status(404).json({
    message: 'Route not found'
  });

});


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {

  console.error("========================================");
  console.error("🔥 GLOBAL EXPRESS ERROR");
  console.error("Error name:", err.name);
  console.error("Error message:", err.message);
  console.error("Error stack:", err.stack);
  console.error("Request method:", req.method);
  console.error("Request URL:", req.originalUrl);
  console.error("========================================");

  res.status(500).json({
    message: 'Server error',
    error: err.message
  });

});


// =====================================================
// MONGODB CONNECTION
// =====================================================

console.log("🔌 Connecting to MongoDB...");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {

    console.log("========================================");
    console.log("✅ MongoDB connected successfully");
    console.log("========================================");

  })
  .catch((error) => {

    console.error("========================================");
    console.error("❌ MongoDB connection failed");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("========================================");

  });


// =====================================================
// SERVER START
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log("========================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("========================================");

});
*/

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://blog-system-one-phi.vercel.app',
  'https://blog-system-mbvfwrmk7-samis-projects-dfdd6365.vercel.app',
  'https://blog-system-6foiwl6ql-samis-projects-dfdd6365.vercel.app',
];

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header,
      // such as server-to-server requests and health checks.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const error = new Error('Origin not allowed by CORS');
      error.status = 403;

      return callback(error);
    },

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

// =====================================================
// ROOT ROUTE
// =====================================================

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Blog System API is running',
  });
});

// =====================================================
// API ROUTES
// =====================================================

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  return res.status(404).json({
    message: 'Route not found',
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // Handle malformed JSON sent by the client.
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    Object.prototype.hasOwnProperty.call(err, 'body')
  ) {
    return res.status(400).json({
      message: 'Invalid JSON request body',
    });
  }

  const statusCode =
    Number.isInteger(err.status) &&
    err.status >= 400 &&
    err.status < 500
      ? err.status
      : 500;

  // Log only the error category, not request data or secrets.
  if (statusCode >= 500) {
    console.error('Unhandled server error:', err.name || 'Error');
  }

  return res.status(statusCode).json({
    message:
      statusCode === 403
        ? 'Origin not allowed'
        : statusCode === 500
          ? 'Internal server error'
          : 'Request could not be processed',
  });
});

// =====================================================
// START SERVER
// =====================================================

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  app.listen(PORT, () => {
    console.log(`Blog System API listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Server startup failed:', error.name || 'Error');
  process.exit(1);
});

module.exports = app;
