const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    // Personal Information
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: false },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },

    // Address
    address: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        zipCode: { type: String, required: false }
    },

    // Emergency Contact
    emergencyContact: {
        name: { type: String, required: false },
        relationship: { type: String, required: false },
        phone: { type: String, required: false },
    },

    // Medical History
    medicalHistory: {
        allergies: { type: String, required: false },
        medications: { type: String, required: false },
        familyHistory: { type: String, required: false },
        pastProcedures: { type: String, required: false },
        other: { type: String, required: false }
    },

    // Vital Signs
    vitalSigns: {
        bloodPressure: { type: String, required: false },
        weight: { type: String, required: false },
        height: { type: String, required: false },
        bloodSugar: { type: String, required: false },
        temperature: { type: String, required: false },
        other: { type: String, required: false }
    },

    // Appointment Preferences
    appointmentPreferences: {
        preferredDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },  // Preferred doctor
        preferredTimes: { type: String, required: false },  // Preferred time for appointments (e.g., mornings, afternoons)
        preferredDays: { type: String, required: false }    // Preferred days (e.g., weekdays, weekends)
    },

    // Attachments
    attachments: [
        {
            fileUrl: { type: String, required: false },     // URL to attached files (e.g., scans, documents)
            description: { type: String, required: false }, // Description of the attachment
            uploadDate: { type: Date, default: Date.now }   // Date the file was uploaded
        }
    ],

    // Image (Profile Picture)
    image: { type: String, required: false, default: '' },

    // References to the User who created the patient record
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, {
    timestamps: true,
});

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;