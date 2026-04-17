const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// POST /api/auth/login - Admin login
router.post('/login', authController.login);

// POST /api/auth/register - Register new admin (protected, only SUPER_ADMIN)
router.post('/register', authMiddleware, authController.register);

// GET /api/auth/me - Get current admin info
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
