/*welcome here in route post file for java script*

const express = require('express');
const router = express.Router();
const { createPost, updatePost, deletePost, getPosts, getPostById} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');  // استيراد middleware للتحقق من المصادقة

router.post('/', protect, createPost);
router.get('/', protect, getPosts);
router.get('/:id', protect, getPostById);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createPost, getPosts } = require('../controllers/postController');

router.get('/', getPosts);           // متاح للجميع
router.post('/', protect, createPost); // إنشاء يتطلب توكن

module.exports = router;
