const mongoose = require('mongoose');

const DoctorsSchema = new mongoose.Schema(
    {
        name: {
            ar: { type: 'String', required: [true, 'Name is required'] },
            en: { type: 'String', required: [true, 'Name is required'] },
        },
        position: {
            ar: { type: 'String', required: [true, 'Position is required'] },
            en: { type: 'String', required: [true, 'Position is required'] },
        },
        description: {
            ar: { type: 'String', required: [true, 'Description is required'] },
            en: { type: 'String', required: [true, 'Description is required'] },
        },
        imageUrl: {
            type: String,
            default: 'https://via.placeholder.com/150',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        socialLinks: {
            facebook: String,
            twitter: String,
            instagram: String,
            linkedin: String,
        },
    },
    { timestamps: true }
);

const Doctors = mongoose.model('Doctors', DoctorsSchema);
module.exports = Doctors;