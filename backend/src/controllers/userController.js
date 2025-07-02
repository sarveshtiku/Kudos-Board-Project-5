const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get current user's profile
exports.getProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, name: true, email: true, googleId: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update current user's profile
exports.updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { username, name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { username, name, email },
      select: { id: true, username: true, name: true, email: true, googleId: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
}; 