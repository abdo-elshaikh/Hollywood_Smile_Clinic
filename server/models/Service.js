const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
