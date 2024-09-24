const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        sparse: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    age: { type: Number, min: [0, 'Age cannot be less than 0'], required: false },
    phone: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please add a valid phone number'],
        required: false
    },
    address: { type: String, required: false },
    description: { type: String, required: false },
    avatar: { type: String, required: false, default: '' },
    role: { type: String, required: true, default: 'patient' },
    active: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Virtual field to get 'id' (alias for _id)
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
    virtuals: true,
});

// Indexing email field for faster queries
userSchema.index({ email: 1 });

// Pre-save hook for password encryption
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to match user-entered password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export user model
const User = mongoose.model('User', userSchema);

module.exports = User;
