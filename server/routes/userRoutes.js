const express = require('express');
const { getAllUsers, getProfile, updateProfile, deleteUser, getUserByEmail, changeStatus, changeRole } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, roleMiddleware('getUsers'), getAllUsers); // get all users
router.get('/:id', isAuthenticated, roleMiddleware('getuser'), getProfile); // get profile
router.put('/:id', isAuthenticated, roleMiddleware('updateUser'), updateProfile); // update profile
router.delete('/:id', isAuthenticated, roleMiddleware('deleteUser'), deleteUser); // delete user
router.get('/:email', isAuthenticated, roleMiddleware('getUserByEmail'), getUserByEmail); // get user by email
router.put('/change-status/:id', isAuthenticated, roleMiddleware('changeUserStatus'), changeStatus); // change user status
router.put('/change-role/:id', isAuthenticated, roleMiddleware('changeUserRole'), changeRole); // change user role

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
