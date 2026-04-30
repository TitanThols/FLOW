const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Public
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected
router.use(authController.protect);
router.get('/', userController.getAllUsers);

module.exports = router;