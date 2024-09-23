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
    role: {
        type: String,
        enum: [
            'doctor',          // Medical professionals who diagnose and treat patients
            'nurse',           // Nurses assisting doctors and taking care of patients
            'receptionist',    // Manages appointments and front-desk responsibilities
            'patient',         // People receiving medical care
            'admin',           // Administrative staff handling operational aspects
            'manager',         // Clinic manager overseeing operations
            'accountant',      // Manages the clinic’s finances and billing
            'hr',              // Human Resources managing staff recruitment and employee relations
            'lab_technician',  // Lab staff performing diagnostic tests
            'pharmacist',      // Manages medications and prescriptions
            'dentist',         // Specialized in dental care and treatments
            'orthodontist',    // Specialized in correcting teeth and jaw alignment
            'hygienist',       // Dental hygienist assisting with teeth cleaning and oral health
            'radiologist',     // Handles imaging techniques like X-rays, MRI, etc.
            'other',           // Any other non-specific role
        ],
        default: 'patient',  // Default to patient for unassigned roles
        required: true,
    },
    status: {type: Boolean, default: true},
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
