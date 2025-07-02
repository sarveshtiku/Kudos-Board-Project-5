const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');

// Get current user's profile
router.get('/me', auth, controller.getProfile);

// Update current user's profile
router.put('/me', auth, controller.updateProfile);

module.exports = router; 