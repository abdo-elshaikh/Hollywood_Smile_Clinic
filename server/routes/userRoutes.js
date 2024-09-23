const express = require('express');
const { getAllUsers, getProfile, updateProfile, deleteUser, getUserByEmail, changeStatus, changeRole } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, getAllUsers); // get all users
router.get('/profile', isAuthenticated, getProfile); // get profile
router.put('/profile', isAuthenticated, updateProfile); // update profile
router.delete('/:id', isAuthenticated, deleteUser); // delete user
router.get('/:email', isAuthenticated, getUserByEmail); // get user by email
router.put('/change-status/:id', isAuthenticated, changeStatus); // change user status
router.put('/change-role/:id', isAuthenticated, changeRole); // change user role

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
