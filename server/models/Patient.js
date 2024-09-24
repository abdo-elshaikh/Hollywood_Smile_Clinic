const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subschema for Address
const AddressSchema = new Schema({
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true }
});

// Subschema for Emergency Contact
const EmergencyContactSchema = new Schema({
    name: { type: String, trim: true },
    relationship: { type: String, trim: true },
    phone: { type: String, trim: true }
});

// Subschema for Medical History
const MedicalHistorySchema = new Schema({
    allergies: { type: String, trim: true },
    medications: { type: String, trim: true },
    familyHistory: { type: String, trim: true },
    pastProcedures: { type: String, trim: true },
    other: { type: String, trim: true }
});

// Subschema for Vital Signs
const VitalSignsSchema = new Schema({
    bloodPressure: { type: String, trim: true },
    weight: { type: String, trim: true },
    height: { type: String, trim: true },
    bloodSugar: { type: String, trim: true },
    temperature: { type: String, trim: true },
    other: { type: String, trim: true }
});

// Subschema for Attachments
const AttachmentSchema = new Schema({
    fileUrl: { type: String, required: true },
    type: { type: String, trim: true },
    description: { type: String, trim: true },
    uploadDate: { type: Date, default: Date.now }
});

// Main Patient Schema
const PatientSchema = new Schema({
    // Personal Information
    patientCode: { type: Number, required: true, unique: true, description: 'Code of the patient', index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true, index: true },
    whatsapp: { type: String, trim: true },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, enum: ['male', 'female'], required: true },
    avatar: { type: String },

    // Address
    address: AddressSchema,

    // Patient Status
    status: {
        type: String,
        enum: ['newPatient', 'followUp', 'regular', 'completed'],
        default: 'newPatient',
        index: true
    },

    // Emergency Contact
    emergencyContact: EmergencyContactSchema,

    // Medical History
    medicalHistory: MedicalHistorySchema,

    // Vital Signs
    vitalSigns: VitalSignsSchema,

    // Attachments (like medical documents or reports)
    attachments: [AttachmentSchema],

    // Treatment Plan (reference to TreatmentPlan model)
    treatmentPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TreatmentPlan'
    },

    // Appointments and Visits (reference to Appointment model)
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],

    // Prescriptions (reference to Prescription model)
    prescriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription'
    }],

    // Billing Information (reference to Billing model)
    billing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Billing'
    },

    // References to the User who created the patient record
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

}, {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

// Adding indexes for performance optimization
PatientSchema.index({ email: 1, phone: 1 });

// Adding custom validation or hooks (optional)
PatientSchema.pre('save', function (next) {
    // Custom logic before saving (like age validation based on dateOfBirth)
    this.age = new Date().getFullYear() - this.dateOfBirth.getFullYear();
    next();
});

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
