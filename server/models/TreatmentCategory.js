const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreatmentCategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
});

const TreatmentCategory = mongoose.model('TreatmentCategory', TreatmentCategorySchema);
module.exports = TreatmentCategory;
