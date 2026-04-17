const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', testimonialController.getAllTestimonials);
router.post('/', authMiddleware, testimonialController.createTestimonial);
router.put('/:id', authMiddleware, testimonialController.updateTestimonial);
router.delete('/:id', authMiddleware, testimonialController.deleteTestimonial);

module.exports = router;
