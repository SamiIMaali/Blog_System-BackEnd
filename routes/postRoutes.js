/*
const express = require('express');

const router = express.Router();

const protect = require('../middleware/authMiddleware');

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');


// =====================================================
// PUBLIC ROUTES
// =====================================================

// Get all posts
router.get('/', getPosts);

// Get single post
router.get('/:id', getPostById);


// =====================================================
// PROTECTED ROUTES
// =====================================================

// Create post
router.post('/', protect, createPost);

// Update post
router.put('/:id', protect, updatePost);

// Delete post
router.delete('/:id', protect, deletePost);


module.exports = router;
*/

const express = require('express');

const protect = require('../middleware/authMiddleware');

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

// =====================================================
// PUBLIC ROUTES
// =====================================================

// GET /api/posts
router.get('/', getPosts);

// GET /api/posts/:id
router.get('/:id', getPostById);

// =====================================================
// PROTECTED ROUTES
// =====================================================

// POST /api/posts
router.post('/', protect, createPost);

// PUT /api/posts/:id
router.put('/:id', protect, updatePost);

// DELETE /api/posts/:id
router.delete('/:id', protect, deletePost);

module.exports = router;
