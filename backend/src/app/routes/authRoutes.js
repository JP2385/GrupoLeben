const express = require('express');
const { register, login, changePassword, getProfile, recoverPassword, resetPassword, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/recover-password', recoverPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', authMiddleware, changePassword);
router.get('/profile', getProfile);
router.get('/verify', authMiddleware, verifyToken); // Añade esta línea

module.exports = router;

