const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/mailService');
const generateAuthToken = require('../utils/generateAuthToken');
require('dotenv').config();

// Register user
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = generateAuthToken(user._id);
        if (!token) {
            return res.status(500).json({ message: 'Failed to generate token' });
        }

        const mailOptions = {
            from: `${process.env.NAME_SENDER} <${process.env.EMAIL_SENDER}>`,
            to: email,
            subject: 'Registration Successful',
            html: `
                <h1>Registration Successful</h1>
                <p>Welcome ${name}, you have successfully registered. Please use the following token to activate your account:</p>
                <h2><a href="${process.env.CLIENT_URI}/auth/activate/${token}">Activate Account</a></h2>
                <p>If you did not register, please ignore this email.</p>
                <p>Thank you,</p>
                <p>The Support Team</p>
            `,
        };

        await sendMail(mailOptions);
        res.status(201).json({ token, message: 'Registration successful. Please check your email to activate your account.' });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials: User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials: Password is incorrect' });
        }

        const token = generateAuthToken(user._id);
        res.status(200).json({ user, token, message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Activate user
const activate = async (req, res) => {
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        user.isVerified = true;
        await user.save();

        const mailOptions = {
            from: `${process.env.NAME_SENDER} <${process.env.EMAIL_SENDER}>`,
            to: user.email,
            subject: 'Account Verified',
            html: `
                <h1>Account Verified</h1>
                <p>Welcome ${user.name}, your account has been successfully verified.</p>
                <h2><a href="${process.env.CLIENT_URI}/auth/login">Click here to login</a></h2>
                <p>If you did not register, please ignore this email.</p>
                <p>Thank you,</p>
                <p>The Support Team</p>
            `,
        };

        await sendMail(mailOptions);
        res.status(200).json({ message: 'User verified successfully' });

    } catch (error) {
        console.error('Activation error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Change password
const changePassword = async (req, res) => {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: error.message });
    }
}

// forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

        const mailOptions = {
            from: `${process.env.NAME_SENDER} <${process.env.EMAIL_SENDER}>`,
            to: email,
            subject: 'Reset Password',
            html: `
                <h1>Reset Password</h1>
                <p>Please use the following link to reset your password:</p>
                <h2><a href="${process.env.CLIENT_URI}/auth/reset-password/${token}">Reset Password</a></h2>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Thank you,</p>
                <p>The Support Team</p>
            `,
        };

        await sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset email sent successfully, please check your email' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: error.message });
    }
}

// reset password
const resetPassword = async (req, res) => {
    const token = req.params.token;
    const { newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully, you can now login' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register,
    login,
    activate,
    changePassword,
    forgotPassword,
    resetPassword
};
