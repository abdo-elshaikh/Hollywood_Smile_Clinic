const express = require('express');
const { getAllAppointments, createAppointment,
    getAppointmentByPatient, getAppointmentByDoctor,
    getAppointmentByDepartment, updateAppointmentStatus,
    updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, roleMiddleware('getAppointments'), getAllAppointments); // get all appointments
router.post('/', isAuthenticated, roleMiddleware('createAppointment'), createAppointment); // create appointment
router.get('/patient/:id', isAuthenticated, roleMiddleware('getAppointmentsByPatient'), getAppointmentByPatient); // get appointments by patient
router.get('/doctor/:id', isAuthenticated, roleMiddleware('getAppointmentsByDoctor'), getAppointmentByDoctor); // get appointments by doctor
router.get('/department/:id', isAuthenticated, roleMiddleware('getAppointmentsByDepartment'), getAppointmentByDepartment); // get appointments by department
router.put('/status/:id', isAuthenticated, roleMiddleware('updateAppointmentStatus'), updateAppointmentStatus); // update appointment status
router.put('/:id', isAuthenticated, roleMiddleware('updateAppointment'), updateAppointment); // update appointment
router.delete('/:id', isAuthenticated, roleMiddleware('deleteAppointment'), deleteAppointment); // delete appointment

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
