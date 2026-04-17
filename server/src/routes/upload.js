const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { authMiddleware } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.post('/', authMiddleware, upload.single('file'), uploadController.uploadFile);

module.exports = router;
