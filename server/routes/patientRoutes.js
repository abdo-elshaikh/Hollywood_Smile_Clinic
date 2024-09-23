const express = require('express');
const { getAllPatients, createPatient, getPatientById, updatePatient, deletePatient } = require('../controllers/patientController');
const { getPatientByName, getPatientByCode, getPatientByPhone } = require('../controllers/patientController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, getAllPatients); // get all patients
router.get('/name/:name', isAuthenticated, getPatientByName); // get patient by name
router.get('/code/:code', isAuthenticated, getPatientByCode); // get patient by code
router.get('/phone/:phone', isAuthenticated, getPatientByPhone); // get patient by phone
router.get('/:id', isAuthenticated, getPatientById); // get patient by id
router.post('/', isAuthenticated, createPatient); // create patient
router.put('/:id', isAuthenticated, updatePatient); // update patient
router.delete('/:id', isAuthenticated, deletePatient); // delete patient

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
