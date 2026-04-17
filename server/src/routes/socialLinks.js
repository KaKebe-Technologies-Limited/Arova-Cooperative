const express = require('express');
const router = express.Router();
const socialLinkController = require('../controllers/socialLinkController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', socialLinkController.getAllSocialLinks);
router.post('/', authMiddleware, socialLinkController.createSocialLink);
router.put('/:id', authMiddleware, socialLinkController.updateSocialLink);
router.delete('/:id', authMiddleware, socialLinkController.deleteSocialLink);

module.exports = router;
