const express = require('express');
const router = express.Router();
const controller = require('../controllers/boardControllers');

// Get all boards (with optional filters in controller)
router.get("/", controller.getAllBoards);

// Get a single board by ID (with cards)
router.get("/:id", controller.getBoardById);

// Create a new board
router.post("/", controller.createBoard);

// Add a new card to a board
router.post("/:boardId/cards", controller.addNewCard);

// Delete a board (cascade deletes cards/comments)
router.delete("/:id", controller.deleteBoard);

module.exports = router;