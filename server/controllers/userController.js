const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });

    } catch (error) {
        console.error('Profile retrieval error:', error);
        res.status(500).json({ message: error.message });
    }
};
// update profile
const updateProfile = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by email
const getUserByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// change status
const changeStatus = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = !user.status;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// change role
const changeRole = async (req, res) => {
    const id = req.params.id;
    const { role } = req.body;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = role;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getProfile,
    updateProfile,
    deleteUser,
    getUserByEmail,
    changeStatus,
    changeRole
}
