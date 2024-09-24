const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    prescriptionItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Treatment', required: true }],
    customTreatments: [{ type: String, required: false }],
    date: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;