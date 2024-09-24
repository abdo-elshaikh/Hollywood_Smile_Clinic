const mongoose = require('mongoose');
const schema = mongoose.Schema;


const RolePermissionsSchema = new schema({
    role: { type: String, required: true, unique: true },
    permissions: [{ type: String, required: true, unique: true }],
});

const RolePermissions = mongoose.model('RolePermissions', RolePermissionsSchema);
module.exports = RolePermissions;
