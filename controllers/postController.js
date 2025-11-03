/*welcome here in authentication controllers file for java script*
const Post = require('../models/Post');
const { post } = require('../routes/authRoutes');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  
  try {
    const post = new Post({ title, content, user: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
};


const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};


module.exports = { createPost, updatePost, deletePost, getPosts, getPostById};
*/
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });

    const post = await Post.create({
      title,
      content,
      user: req.user._id
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    // إرجاع منشورات كل المستخدمين أو فقط للمستخدم الحالي؟
    // هنا نرجع منشورات **جميع** المستخدمين مع اسم المالك:
    const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// إذا رغبت بجلب منشورات المستخدم فقط استخدم:
// const posts = await Post.find({ user: req.user._id });
