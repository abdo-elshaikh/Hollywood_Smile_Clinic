const mongoose = require('mongoose');

const ContractTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // e.g., "Standard", "Premium", "Insurance Plan"
  description: { type: String },                           // Description of the contract type
  discountPercentage: { type: Number, default: 0 },       // Discount percentage on services
  discountAmount: { type: Number, default: 0 }            // Fixed discount amount on services
});

const ContractType = mongoose.model('ContractType', ContractTypeSchema);
module.exports = ContractType;