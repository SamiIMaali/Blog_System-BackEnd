/*welcome here in User module file for java script
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use valid Email address.'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password should be at least 6 characters.'],  
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, 
    default: '', 
  },
}, { timestamps: true });


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); 
};

const User = mongoose.model('User', userSchema);

module.exports = User;

this code to fix problem which written below
*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use valid Email address.'],
  },

  password: {
    type: String,
    required: true,
    minlength: [6, 'Password should be at least 6 characters.'],
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
    default: '',
  },

}, { timestamps: true });


// ==========================================
// 📋 DEBUG: CHECK USER SCHEMA FIELDS
// ==========================================

console.log(
  "📋 User schema fields:",
  Object.keys(userSchema.paths)
);


// ==========================================
// 🔐 PASSWORD HASHING + DEBUG LOGGING
// ==========================================

userSchema.pre("save", async function(next) {

  console.log("=================================");
  console.log("🔐 USER PRE-SAVE HOOK");
  console.log("User ID:", this._id);
  console.log("Email:", this.email);
  console.log("Password modified:", this.isModified("password"));
  console.log("=================================");

  try {

    if (!this.isModified("password")) {
      console.log("Password not modified - skipping hash");
      return next();
    }

    console.log("Hashing password...");

    this.password = await bcrypt.hash(this.password, 10);

    console.log("Password hashed successfully");

    next();

  } catch (error) {

    console.error("❌ PASSWORD HASH ERROR");
    console.error("Error:", error.message);
    console.error(error.stack);

    next(error);
  }
});


// ==========================================
// 🔑 PASSWORD COMPARISON
// ==========================================

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// ==========================================
// 👤 USER MODEL
// ==========================================

const User = mongoose.model('User', userSchema);

module.exports = User;

