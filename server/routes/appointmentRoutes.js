const express = require('express');
const { getAllAppointments, createAppointment,
    getAppointmentByPatient, getAppointmentByDoctor,
    getAppointmentByDepartment, updateAppointmentStatus,
    updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, getAllAppointments); // get all appointments
router.post('/', isAuthenticated, createAppointment); // create appointment
router.get('/patient/:id', isAuthenticated, getAppointmentByPatient); // get appointments by patient
router.get('/doctor/:id', isAuthenticated, getAppointmentByDoctor); // get appointments by doctor
router.get('/department/:id', isAuthenticated, getAppointmentByDepartment); // get appointments by department
router.put('/status/:id', isAuthenticated, updateAppointmentStatus); // update appointment status
router.put('/:id', isAuthenticated, updateAppointment); // update appointment
router.delete('/:id', isAuthenticated, deleteAppointment); // delete appointment

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
