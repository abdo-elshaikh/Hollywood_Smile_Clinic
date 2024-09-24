const express = require('express');
const { getAllPatients, createPatient, getPatientById, updatePatient, deletePatient } = require('../controllers/patientController');
const { getPatientByName, getPatientByCode, getPatientByPhone } = require('../controllers/patientController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, roleMiddleware('getPatients'), getAllPatients); // get all patients
router.get('/name/:name', isAuthenticated, roleMiddleware('getPatientByName'), getPatientByName); // get patient by name
router.get('/code/:code', isAuthenticated, roleMiddleware('getPatientByCode'), getPatientByCode); // get patient by code
router.get('/phone/:phone', isAuthenticated, roleMiddleware('getPatientByPhone'), getPatientByPhone); // get patient by phone
router.get('/:id', isAuthenticated, roleMiddleware('getPatientById'), getPatientById); // get patient by id
router.post('/', isAuthenticated, roleMiddleware('createPatient'), createPatient); // create patient
router.put('/:id', isAuthenticated, roleMiddleware('updatePatient'), updatePatient); // update patient
router.delete('/:id', isAuthenticated, roleMiddleware('deletePatient'), deletePatient); // delete patient

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
