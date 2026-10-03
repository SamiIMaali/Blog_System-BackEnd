/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: [
	'https://blog-system-one-phi.vercel.app',
  	'https://blog-system-6foiwl6ql-samis-projects-dfdd6365.vercel.app'
	]
}));

app.use(express.json());

// ================== logging to fix problem
app.use((req, res, next) => {
  console.log("=================================");
  console.log("📥 Incoming Request");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Origin:", req.headers.origin);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("=================================");

  next();
});
// ==================
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
  });
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
----------------------------------------------------------------------------------------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();


// ==========================================
// 🌐 CORS
// ==========================================

app.use(cors({
  origin: [
    'https://blog-system-one-phi.vercel.app',
    'https://blog-system-mbvfwrmk7-samis-projects-dfdd6365.vercel.app',
    'https://blog-system-6foiwl6ql-samis-projects-dfdd6365.vercel.app'
  ]
}));


// ==========================================
// 📦 JSON BODY PARSER
// ==========================================

app.use(express.json());


// ==========================================
// 📥 REQUEST LOGGING
// ==========================================

app.use((req, res, next) => {
  console.log("=================================");
  console.log("📥 Incoming Request");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Origin:", req.headers.origin);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("=================================");

  next();
});


// ==========================================
// 🍃 CONNECT TO MONGODB
// ==========================================

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
  });


// ==========================================
// 🛣️ ROUTES
// ==========================================

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


// ==========================================
// 🔥 GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("=================================");
  console.error("🔥 GLOBAL ERROR HANDLER");
  console.error("Error name:", err.name);
  console.error("Error message:", err.message);
  console.error("Error stack:", err.stack);
  console.error("=================================");

  res.status(500).json({
    message: "Internal server error",
    error: err.message
  });
});


// ==========================================
// 🚀 START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
----------------------------------------------------------------------------------------------------------------------
*/
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
  'https://blog-system-one-phi.vercel.app',
  'https://blog-system-6foiwl6ql-samis-projects-dfdd6365.vercel.app',
  'https://blog-system-mbvfwrmk7-samis-projects-dfdd6365.vercel.app'
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
