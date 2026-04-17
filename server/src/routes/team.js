const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { authMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', teamController.getAllMembers);

// Protected routes
router.post('/', authMiddleware, teamController.createMember);
router.put('/:id', authMiddleware, teamController.updateMember);
router.delete('/:id', authMiddleware, teamController.deleteMember);

module.exports = router;
