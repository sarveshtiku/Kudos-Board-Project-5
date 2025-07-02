const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentControllers');

// Get all comments for a card
router.get('/card/:cardId', controller.getCommentsForCard);

// Add a comment to a card
router.post('/card/:cardId', controller.addComment);

// Delete a comment
router.delete('/:id', controller.deleteComment);

module.exports = router;
