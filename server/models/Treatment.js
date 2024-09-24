const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatmentSchema = new Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'TreatmentCategory', required: true },
    dosage: { type: String, required: false },
    instructions: { type: String, required: false },
});

const Treatment = mongoose.model('Treatment', TreatmentSchema);
module.exports = Treatment;
