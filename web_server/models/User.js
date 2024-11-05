const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'visitor', 'editor', 'author'], default: 'visitor' },
        isActive: { type: Boolean, default: true },
        avatarUrl: { type: String, default: 'https://via.placeholder.com/150' },
    },
    { timestamps: true }
);

// Encrypt the password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with the hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the User model is already defined in Mongoose
const User = mongoose.models.User || mongoose.model('User', UserSchema)
module.exports = User;
