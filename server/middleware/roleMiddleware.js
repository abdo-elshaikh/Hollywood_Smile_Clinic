const RolesPermissions = require('../models/RolesPermission');

const roleMiddleware = (requiredPermission) => async (req, res, next) => {
    const { user: { role: userRole } = {} } = req;

    if (!userRole) {
        return res.status(403).json({ message: 'Forbidden: Role not found' });
    }

    try {
        const role = await RolesPermissions.findOne({ role: userRole });
        if (!role) {
            return res.status(403).json({ message: 'Forbidden: Role access denied' });
        }

        if (!role.permissions.includes(requiredPermission)) {
            return res.status(403).json({ message: 'Forbidden: Permission not allowed for this role' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = { roleMiddleware };
