const express = require('express');
const router = express.Router();
const controller = require('../controllers/boardControllers');

router.get("/", controller.getAllBoards);
router.get("/:id", controller.getBoardById);  // loading in singular board
router.post("/", controller.createBoard);
router.post("/:boardId/cards", controller.addNewCard);  // do we want to add new cards via the card or board controllers
router.put("/:id", controller.updateBoard);  // should we be able to edit the boards name etc ?? (not done in kudos board website.)
router.delete("/:id", controller.deleteBoard);


module.exports = router;