const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', announcementController.getAllAnnouncements);

// Protected routes
router.post('/', authMiddleware, announcementController.createAnnouncement);
router.put('/:id', authMiddleware, announcementController.updateAnnouncement);
router.delete('/:id', authMiddleware, announcementController.deleteAnnouncement);

module.exports = router;