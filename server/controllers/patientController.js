const Patient = require('../models/Patient');

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        if (patients) {
            res.status(200).json(patients);
        } else {
            res.status(204).json({ message: 'No patients found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPatientById = async (req, res) => {
    const patientId = req.params.id;
    try {
        const patient = await Patient.findById(patientId);
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPatient = async (req, res) => {
    const patient = req.body;
    try {
        const newPatient = new Patient.create(patient);
        if (newPatient) {
            res.status(201).json(newPatient);
        } else {
            res.status(400).json({ message: 'Failed to create patient' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePatient = async (req, res) => {
    const patientId = req.params.id;
    const patient = req.body;
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(patientId, patient, { new: true });
        if (updatedPatient) {
            res.status(200).json(updatedPatient);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePatient = async (req, res) => {
    const patientId = req.params.id;
    try {
        const deletedPatient = await Patient.findByIdAndDelete(patientId);
        if (deletedPatient) {
            res.status(200).json({ message: 'Patient deleted successfully' });
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPatientByName = async (req, res) => {
    const name = req.params.name;
    try {
        const patients = await Patient.findOne({ name: { $regex: new RegExp(name, 'i') } });
        if (patients) {
            res.status(200).json(patients);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPatientByCode = async (req, res) => {
    const code = req.params.code;
    try {
        const patients = await Patient.findOne({ code });
        if (patients) {
            res.status(200).json(patients);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPatientByPhone = async (req, res) => {
    const phone = req.params.phone;
    try {
        const patients = await Patient.findOne({ phone });
        if (patients) {
            res.status(200).json(patients);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientByName,
    getPatientByCode,
    getPatientByPhone
}