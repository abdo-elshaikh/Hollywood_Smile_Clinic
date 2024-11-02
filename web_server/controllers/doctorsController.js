const Doctors = require('../models/Doctors');

const getDoctors = async (req, res) => {
    const doctors = await Doctors.find().populate('socialLinks');
    if (!doctors || !doctors.length) {
        res.status(404).json({ message: 'No doctors found' });
    } else {
        res.status(200).json(doctors);
    }
};

const getDoctorById = async (req, res) => {
    const doctor = await Doctors.findById(req.params.id).populate('socialLinks');
    if (doctor) {
        res.status(200).json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};

const createDoctor = async (req, res) => {
    const doctor = await Doctors.create(req.body);
    if (doctor) {
        res.status(201).json(doctor);
    } else {
        res.status(400).json({ message: 'Failed to create doctor' });
    }
};

const updateDoctor = async (req, res) => {
    const doctor = await Doctors.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (doctor) {
        res.status(200).json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};

const deleteDoctor = async (req, res) => {
    const doctor = await Doctors.findByIdAndDelete(req.params.id);
    if (doctor) {
        res.status(200).json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};

module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor,
};