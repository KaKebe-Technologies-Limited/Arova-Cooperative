const express = require('express');
const router = express.Router();
const pageContentController = require('../controllers/pageContentController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', pageContentController.getAllPageContent);
router.post('/', authMiddleware, pageContentController.createPageContent);
router.put('/:id', authMiddleware, pageContentController.updatePageContent);
router.delete('/:id', authMiddleware, pageContentController.deletePageContent);

module.exports = router;
