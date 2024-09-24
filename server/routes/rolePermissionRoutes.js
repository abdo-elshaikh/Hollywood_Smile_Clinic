const express = require('express');
const { getRolePermissions, addRolePermissions, updateRolePermissions, getPermissionsByRole } = require('../controllers/rolePermissionsController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, roleMiddleware('getRolePermissions'), getRolePermissions); // get all role permissions
router.post('/', isAuthenticated, roleMiddleware('addRolePermissions'), addRolePermissions); // add role permissions
router.put('/', isAuthenticated, roleMiddleware('updateRolePermissions'), updateRolePermissions); // update role permissions
router.get('/:id', isAuthenticated, roleMiddleware('getPermissionsByRole'), getPermissionsByRole); // get permissions by role

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
