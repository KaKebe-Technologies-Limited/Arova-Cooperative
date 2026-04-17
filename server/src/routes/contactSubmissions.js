const express = require('express');
const router = express.Router();
const contactSubmissionController = require('../controllers/contactSubmissionController');
const { authMiddleware } = require('../middleware/auth');

// Public route - submit contact form
router.post('/', contactSubmissionController.submitContactForm);

// Protected routes - view submissions
router.get('/', authMiddleware, contactSubmissionController.getAllSubmissions);
router.put('/:id', authMiddleware, contactSubmissionController.markAsRead);
router.delete('/:id', authMiddleware, contactSubmissionController.deleteSubmission);

module.exports = router;
