const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/google', authController.googleLogin);
router.post('/signup', authController.signup);
router.post('/forgot-password', authController.forgotPassword);
router.post('/complete-google-signup', authController.completeGoogleSignup);

module.exports = router;