const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all cards for a board
exports.getCardsForBoard = async (req, res) => {
  const boardId = Number(req.params.boardId);
  console.log('boardId:', boardId, 'params:', req.params)
  if (!boardId) {
    return res.status(400).json({ error: 'Missing or invalid boardId' });
  }
  const { search, pinned, authorId } = req.query;
  try {
    const where = { boardId };
    if (typeof pinned !== 'undefined') where.pinned = pinned === 'true';
    if (authorId) where.authorId = Number(authorId);
    if (search) where.message = { contains: search };
    const cards = await prisma.card.findMany({
      where,
      orderBy: [
        { pinned: 'desc' },
        { pinnedAt: 'desc' },
        { createdAt: 'asc' }
      ],
      include: { comments: true }
    });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

// Create a new card for a board
exports.createCard = async (req, res) => {
  const boardId = Number(req.params.boardId);
  const { message, gif } = req.body;
  const authorId = req.user?.userId || null;
  if (!message || !gif) {
    return res.status(400).json({ error: 'Message and gif are required' });
  }
  try {
    const card = await prisma.card.create({
      data: {
        message,
        gif,
        boardId,
        authorId,
      }
    });
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create card' });
  }
};

// Upvote a card
exports.upvoteCard = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const card = await prisma.card.update({
      where: { id },
      data: { upvotes: { increment: 1 } }
    });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upvote card' });
  }
};

// Pin or unpin a card
exports.pinCard = async (req, res) => {
  const id = Number(req.params.id);
  const { pin } = req.body; // true to pin, false to unpin
  try {
    const card = await prisma.card.update({
      where: { id },
      data: {
        pinned: pin,
        pinnedAt: pin ? new Date() : null
      }
    });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to pin/unpin card' });
  }
};

// Delete a card
exports.deleteCard = async (req, res) => {
  const id = Number(req.params.id);
  const userId = req.user?.userId;
  try {
    const card = await prisma.card.findUnique({ where: { id } });
    if (!card) return res.status(404).json({ error: 'Card not found' });
    // Only allow delete if card is anonymous or owned by current user
    if (card.authorId && card.authorId !== userId) {
      return res.status(403).json({ error: 'Not allowed to delete this card' });
    }
    await prisma.card.delete({ where: { id } });
    res.json({ message: 'Card deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete card' });
  }
};

// Giphy search
const { searchGifs } = require('../utils/giphy');
exports.searchGiphy = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Query required' });
  try {
    const gifs = await searchGifs(q);
    res.json(gifs);
  } catch (err) {
    res.status(500).json({ message: 'Giphy search failed' });
  }
};
