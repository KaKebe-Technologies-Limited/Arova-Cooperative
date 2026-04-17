const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', statController.getAllStats);
router.post('/', authMiddleware, statController.createStat);
router.put('/:id', authMiddleware, statController.updateStat);
router.delete('/:id', authMiddleware, statController.deleteStat);

module.exports = router;
