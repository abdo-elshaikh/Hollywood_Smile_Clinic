const express = require('express');
const { login, register, activate, changePassword, forgotPassword, resetPassword } = require('../controllers/authController');
const { isAuthenticated, validateUserInput } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', validateUserInput, login);
router.post('/register', validateUserInput, register);
router.post('/change-password', isAuthenticated, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/activate/:token', activate);

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
