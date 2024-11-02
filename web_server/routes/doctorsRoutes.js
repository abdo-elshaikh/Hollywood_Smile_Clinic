const express = require("express");
const router = express.Router();
const { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorsController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/', protect, authorize('admin'), createDoctor);
router.put('/:id', protect, authorize('admin'), updateDoctor);
router.delete('/:id', protect, authorize('admin'), deleteDoctor);

module.exports = router;