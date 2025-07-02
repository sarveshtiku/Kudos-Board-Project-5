const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all comments for a card
exports.getCommentsForCard = async (req, res) => {
  const cardId = Number(req.params.cardId);
  try {
    const comments = await prisma.comment.findMany({
      where: { cardId },
      orderBy: { createdAt: 'asc' },
      include: { author: true }
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Add a comment to a card
exports.addComment = async (req, res) => {
  const cardId = Number(req.params.cardId);
  const { message, authorId } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  try {
    const comment = await prisma.comment.create({
      data: {
        message,
        cardId,
        authorId: authorId || null // allow anonymous comments
      },
      include: { author: true }
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.comment.delete({ where: { id } });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
