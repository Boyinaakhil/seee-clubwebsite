const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', boardController.getAllBoardMembers);

// Protected routes
router.post('/', authMiddleware, boardController.createBoardMember);
router.put('/:id', authMiddleware, boardController.updateBoardMember);
router.delete('/:id', authMiddleware, boardController.deleteBoardMember);

module.exports = router;