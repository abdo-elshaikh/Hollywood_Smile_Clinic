const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question_en: { type: 'String', required: [true, 'Question in English is required'] },
    question_ar: { type: 'String', required: [true, 'Question in Arabic is required'] },
    answer_en: { type: 'String', required: [true, 'Answer in English is required'] },
    answer_ar: { type: 'String', required: [true, 'Answer in Arabic is required'] },
    showInHome: { type: 'Boolean', default: false },
    tags: { type: 'Array', default: [] },
    order: { type: 'Number', default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);
