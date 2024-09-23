const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
},
{
  timestamps: true,
});

const Department = mongoose.model('Department', DepartmentSchema);
module.exports = Department;