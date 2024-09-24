const Department = require('../models/Department');
const Service = require('../models/Service');


const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        if (departments) {
            res.status(200).json(departments);
        } else {
            res.status(204).json({ message: "No departments found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDepartmentById = async (req, res) => {
    const id = req.params.id;
    try {
        const department = await Department.findById(id);
        if (department) {
            res.status(200).json(department);
        } else {
            res.status(204).json({ message: "No department found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDepartment = async (req, res) => {
    const department = new Department(req.body);
    try {
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDepartment = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedDepartment) {
            res.status(200).json(updatedDepartment);
        } else {
            res.status(204).json({ message: "No department found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDepartment = async (req, res) => {
    const id = req.params.id;
    try {
        // check if service have departments
        const services = await Service.find({ department: id });
        if (services.length > 0) {
            res.status(400).json({ message: "Department has services. Cannot delete." });
        } else {
            const deletedDepartment = await Department.findByIdAndDelete(id);
            if (deletedDepartment) {
                res.status(200).json(deletedDepartment);
            } else {
                res.status(204).json({ message: "No department found" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// export all functions
module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
};
