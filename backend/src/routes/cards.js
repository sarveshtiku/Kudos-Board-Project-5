const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/cardControllers');

// Get all cards for a specific board
router.get('/board/:boardId', controller.getCardsForBoard);

// Create a new card for a board
router.post('/board/:boardId', controller.createCard);

// Upvote a card
router.post('/:id/upvote', controller.upvoteCard);

// Pin or unpin a card
router.post('/:id/pin', controller.pinCard);

// Delete a card
router.delete('/:id', controller.deleteCard);

// Giphy search
router.get('/giphy/search', controller.searchGiphy);

module.exports = router;