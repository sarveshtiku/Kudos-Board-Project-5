const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all boards (with cards)
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        cards: true,
      }
    });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

// Get a single board by ID (with cards)
exports.getBoardById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const board = await prisma.board.findUnique({
      where: { id },
      include: { cards: true }
    });
    if (!board) return res.status(404).json({ error: 'Board not found!' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch board' });
  }
};

// Create a new board
exports.createBoard = async (req, res) => {
  const { title, description, category, image, authorId } = req.body;
  if (!title || !category || !image) {
    return res.status(400).json({ error: 'Title, category, and image are required' });
  }
  try {
    const board = await prisma.board.create({
      data: {
        title,
        description,
        category,
        image,
        authorId: authorId || null, // allow anonymous boards
      }
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create board' });
  }
};

// Add a new card to a board
exports.addNewCard = async (req, res) => {
  const boardId = Number(req.params.boardId);
  const { message, gif, authorId } = req.body;
  if (!message || !gif) {
    return res.status(400).json({ error: 'Message and gif are required' });
  }
  try {
    const card = await prisma.card.create({
      data: {
        message,
        gif,
        boardId,
        authorId: authorId || null, // allow anonymous cards
      }
    });
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add card' });
  }
};

// Delete a board (and cascade delete its cards/comments)
exports.deleteBoard = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.board.delete({
      where: { id }
    });
    res.json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete board' });
  }
};