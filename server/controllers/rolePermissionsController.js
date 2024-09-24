const RolePermissions = require('../models/RolesPermission');

const getRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await RolePermissions.find();
        res.status(200).json(rolePermissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addRolePermissions = async (req, res) => {
    const {role, permissions} = req.body;

    try {
        const role = await RolePermissions.findOne({role});
        if (!role) {
            const newRole = new RolePermissions({role, permissions});
            await newRole.save();
            res.status(201).json(newRole);
        } else {
            res.status(400).json({message: 'Role already exists'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const updateRolePermissions = async (req, res) => {
    const {role, permissions} = req.body;

    try {
        const updateRolePermissions = await role.findOne({ role });
        if (!updateRolePermissions) {
            res.status(404).json({message: 'Role not found'});
        } else {
            updateRolePermissions.permissions = permissions;
            await updateRolePermissions.save();
            res.status(200).json(updateRolePermissions);
        }
        res.status(200).json(updateRolePermissions);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getPermissionsByRole = async (req, res) => {
    const {role} = req.params;
    try {
        const rolePermissions = await RolePermissions.findOne({role});
        if (!rolePermissions) {
            res.status(404).json({message: 'Role not found'});
        } else {
            res.status(200).json(rolePermissions.permissions);
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getRolePermissions,
    addRolePermissions,
    updateRolePermissions,
    getPermissionsByRole
}
