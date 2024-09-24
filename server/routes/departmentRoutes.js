const express = require('express');
const { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, roleMiddleware('getDepartments'), getAllDepartments); // get all departments
router.get('/:id', isAuthenticated, roleMiddleware('getDepartmentById'), getDepartmentById); // get department by id
router.post('/', isAuthenticated, roleMiddleware('createDepartment'), createDepartment); // create department
router.put('/:id', isAuthenticated, roleMiddleware('updateDepartment'), updateDepartment); // update department
router.delete('/:id', isAuthenticated, roleMiddleware('deleteDepartment'), deleteDepartment); // delete department

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
