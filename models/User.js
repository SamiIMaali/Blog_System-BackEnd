/*
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// =====================================================
// USER SCHEMA
// =====================================================

const userSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);


// =====================================================
// DEBUG SCHEMA FIELDS
// =====================================================

console.log(
  '📋 User schema fields:',
  Object.keys(userSchema.paths)
);


// =====================================================
// PASSWORD HASHING
// =====================================================

userSchema.pre('save', async function () {
  console.log('========================================');
  console.log('🔐 USER PRE-SAVE HOOK STARTED');
  console.log('User ID:', this._id);
  console.log('Email:', this.email);
  console.log('Password modified:', this.isModified('password'));
  console.log('========================================');


  if (!this.isModified('password')) {
    console.log('ℹ️ Password not modified - skipping hash');
    return;
  }


try {
    console.log('🔄 Starting password hashing...');

    this.password = await bcrypt.hash(this.password, 10);

    console.log('✅ Password hashing completed successfully');
  } catch (error) {
    console.error('========================================');
    console.error('❌ PASSWORD HASH ERROR');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('========================================');

    throw error;
  }
});


// =====================================================
// PASSWORD COMPARISON
// =====================================================

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// =====================================================
// CREATE MODEL
// =====================================================

const User = mongoose.model('User', userSchema);


// =====================================================
// EXPORT
// =====================================================

module.exports = User;
*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// =====================================================
// USER SCHEMA
// =====================================================

const userSchema = new mongoose.Schema(
  {
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
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please provide a valid email address',
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: [
        6,
        'Password must be at least 6 characters long',
      ],
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    profilePicture: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// =====================================================
// PASSWORD HASHING
// =====================================================

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// =====================================================
// PASSWORD COMPARISON
// =====================================================

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// =====================================================
// CREATE AND EXPORT MODEL
// =====================================================

const User = mongoose.model('User', userSchema);

module.exports = User;
