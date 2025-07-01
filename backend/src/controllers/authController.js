const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
};

exports.googleLogin = async (req, res) => {
  const { credential } = req.body;
  try {
    // Verify Google token
    const googleRes = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    const { email, sub: googleId, name } = googleRes.data;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Instead of creating the user, prompt for username/password
      return res.json({ needsUsername: true, email, googleId, name });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: 'Invalid Google token' });
  }
};

exports.completeGoogleSignup = async (req, res) => {
  const { email, googleId, name, username, password } = req.body;
  if (!email || !googleId || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: { email, googleId, name, username, password: hashedPassword }
    });
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword }
    });
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now
      await prisma.user.update({
        where: { email },
        data: { resetToken, resetTokenExpiry }
      });
      // Simulate sending email (replace with real email logic)
      console.log(`Password reset link: http://localhost:3000/reset-password?token=${resetToken}&email=${email}`);
    }
    // Always respond with the same message for security
    res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};