const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/contactInfoController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', contactInfoController.getAllContactInfo);
router.post('/', authMiddleware, contactInfoController.createContactInfo);
router.put('/:id', authMiddleware, contactInfoController.updateContactInfo);
router.delete('/:id', authMiddleware, contactInfoController.deleteContactInfo);

module.exports = router;
