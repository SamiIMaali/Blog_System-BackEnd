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
*/
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

