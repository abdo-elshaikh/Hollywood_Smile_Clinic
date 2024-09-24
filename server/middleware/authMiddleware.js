const User = require('../models/User');
const RolesPermissions = require('../models/RolesPermission');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const { ConnectionStates } = require('mongoose');
const allPermissions = require('../config/permissions');
dotenv.config();

// middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

const validateUserInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// initialize admin acount
const initializeAdmin = async () => {
    try {
        const user = await User.findOne({ role: 'admin' });
        if (!user) {
            const newUser = new User({ name: 'Admin', email: 'admin@mail.com', password: 'Admin@123', role: 'admin', isVerified: true });
            await newUser.save();
            console.log('Admin account created');
            return newUser;
        } else {
            console.log('Admin account already exists');
        }
    } catch (error) {
        console.log(error);
    }
};

// initialize admin account permissions
const initializeAdminPermissions = async () => {
    try {
        const role = await RolesPermissions.findOne({ role: 'admin' });
        if (!role) {
            const newRole = new RolesPermissions({ role: 'admin', permissions: allPermissions });
            await newRole.save();
            console.log('Admin permissions created');
        } else {
            console.log('Admin permissions already exists');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    isAuthenticated,
    validateUserInput,
    initializeAdmin,
    initializeAdminPermissions
};
