const express = require('express');
const { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, getAllDepartments); // get all departments
router.get('/:id', isAuthenticated, getDepartmentById); // get department by id
router.post('/', isAuthenticated, createDepartment); // create department
router.put('/:id', isAuthenticated, updateDepartment); // update department
router.delete('/:id', isAuthenticated, deleteDepartment); // delete department

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
