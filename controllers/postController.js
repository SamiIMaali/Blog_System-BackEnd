/*
const mongoose = require('mongoose');
const Post = require('../models/Post');

// =====================================================
// CREATE POST
// POST /api/posts
// Protected
// =====================================================

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};

    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      !title.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: 'Title and content must be non-empty strings'
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      user: req.user._id
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error('Create post error:', err.message);

    return res.status(500).json({
      message: 'Error creating post'
    });
  }
};


// =====================================================
// GET ALL POSTS
// GET /api/posts
// Public
// =====================================================

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (err) {
    console.error('Get posts error:', err.message);

    return res.status(500).json({
      message: 'Error fetching posts'
    });
  }
};


// =====================================================
// GET SINGLE POST
// GET /api/posts/:id
// Public
// =====================================================

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid post ID'
      });
    }

    const post = await Post.findById(id)
      .populate('user', 'username');

    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    return res.status(200).json(post);
  } catch (err) {
    console.error('Get post by ID error:', err.message);

    return res.status(500).json({
      message: 'Error retrieving post'
    });
  }
};


// =====================================================
// UPDATE POST
// PUT /api/posts/:id
// Protected
// Owner only
// =====================================================

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    const hasTitle = Object.prototype.hasOwnProperty.call(body, 'title');
    const hasContent = Object.prototype.hasOwnProperty.call(body, 'content');

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid post ID'
      });
    }

    if (!hasTitle && !hasContent) {
      return res.status(400).json({
        message: 'At least one of title or content is required'
      });
    }

    if (
      (hasTitle &&
        (typeof body.title !== 'string' || !body.title.trim())) ||
      (hasContent &&
        (typeof body.content !== 'string' || !body.content.trim()))
    ) {
      return res.status(400).json({
        message: 'Provided title and content must be non-empty strings'
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to update this post'
      });
    }

    if (hasTitle) {
      post.title = body.title.trim();
    }

    if (hasContent) {
      post.content = body.content.trim();
    }

    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Update post error:', err.message);

    return res.status(500).json({
      message: 'Error updating post'
    });
  }
};


// =====================================================
// DELETE POST
// DELETE /api/posts/:id
// Protected
// Owner only
// =====================================================

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid post ID'
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to delete this post'
      });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Post deleted successfully'
    });
  } catch (err) {
    console.error('Delete post error:', err.message);

    return res.status(500).json({
      message: 'Error deleting post'
    });
  }
};
*/

const mongoose = require('mongoose');
const Post = require('../models/Post');

// =====================================================
// CREATE POST
// POST /api/posts
// Protected: authenticated users
// =====================================================

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};

    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      !title.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: 'Title and content must be non-empty strings',
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      user: req.user._id,
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error('Create post failed:', err.name || 'Error');

    return res.status(500).json({
      message: 'Error creating post',
    });
  }
};

// =====================================================
// GET ALL POSTS
// GET /api/posts
// Public
// =====================================================

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (err) {
    console.error('Get posts failed:', err.name || 'Error');

    return res.status(500).json({
      message: 'Error fetching posts',
    });
  }
};

// =====================================================
// GET SINGLE POST
// GET /api/posts/:id
// Public
// =====================================================

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid post ID',
      });
    }

    const post = await Post.findById(id)
      .populate('user', 'username');

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    return res.status(200).json(post);
  } catch (err) {
    console.error('Get post failed:', err.name || 'Error');

    return res.status(500).json({
      message: 'Error retrieving post',
    });
  }
};

// =====================================================
// UPDATE POST
// PUT /api/posts/:id
// Protected: owner only
// =====================================================

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const hasTitle = Object.prototype.hasOwnProperty.call(
      body,
      'title'
    );

    const hasContent = Object.prototype.hasOwnProperty.call(
      body,
      'content'
    );

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid post ID',
      });
    }

    if (!hasTitle && !hasContent) {
      return res.status(400).json({
        message: 'At least one of title or content is required',
      });
    }

    if (
      (hasTitle &&
        (typeof body.title !== 'string' || !body.title.trim())) ||
      (hasContent &&
        (typeof body.content !== 'string' || !body.content.trim()))
    ) {
      return res.status(400).json({
        message: 'Provided title and content must be non-empty strings',
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    if (
      !post.user ||
      post.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'Not authorized to update this post',
      });
    }

    if (hasTitle) {
      post.title = body.title.trim();
    }

    if (hasContent) {
      post.content = body.content.trim();
    }

    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Update post failed:', err.name || 'Error');

    return res.status(500).json({
      message: 'Error updating post',
    });
  }
};

// =====================================================
// DELETE POST
// DELETE /api/posts/:id
// Protected: owner only
// =====================================================

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid post ID',
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    if (
      !post.user ||
      post.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'Not authorized to delete this post',
      });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Post deleted successfully',
    });
  } catch (err) {
    console.error('Delete post failed:', err.name || 'Error');

    return res.status(500).json({
      message: 'Error deleting post',
    });
  }
};
