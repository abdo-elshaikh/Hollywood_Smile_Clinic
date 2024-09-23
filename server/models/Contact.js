const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['received', 'opened', 'completed'], default: 'received' }
}, { 
    timestamps: true
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;