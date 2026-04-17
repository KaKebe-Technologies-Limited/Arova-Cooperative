const express = require('express');
const router = express.Router();
const coreValueController = require('../controllers/coreValueController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', coreValueController.getAllCoreValues);
router.post('/', authMiddleware, coreValueController.createCoreValue);
router.put('/:id', authMiddleware, coreValueController.updateCoreValue);
router.delete('/:id', authMiddleware, coreValueController.deleteCoreValue);

module.exports = router;
