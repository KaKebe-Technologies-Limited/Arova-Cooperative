const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', postController.getAllPosts);
router.get('/:slug', postController.getPostBySlug);

// Protected routes (require authentication)
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
