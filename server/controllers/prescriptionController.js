const Prescription = require('../models/Prescription');

const createPrescription = async (req, res) => {
    const Prescription = req.body;
    try {
        const newPrescription = new Prescription(Prescription);
        await newPrescription.save();
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create prescription' });
    }
};

const getPrescriptionById = async (req, res) => {
    const { id } = req.params;
    try {
        const prescription = await Prescription.findById(id);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescription' });
    }
};

const updatePrescription = async (req, res) => {
    const { id } = req.params;
    const prescription = req.body;
    try {
        const updatedPrescription = await Prescription.findByIdAndUpdate(id, prescription, { new: true });
        if (!updatedPrescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update prescription' });
    }
};

const deletePrescription = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPrescription = await Prescription.findByIdAndDelete(id);
        if (!deletedPrescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete prescription' });
    }
};

const getPrescriptionByPatient = async (req, res) => {
    const { patientId } = req.params;
    try {
        const prescription = await Prescription.find({ patient: patientId })
            .populate({ path: 'doctor', select: 'name' })
            .populate({ path: 'patient', select: 'name' });
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescription' });
    }
};

const getPrescriptionByDoctor = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const prescription = await Prescription.find({ doctor: doctorId })
            .populate({ path: 'doctor', select: 'name' })
            .populate({ path: 'patient', select: 'name' });
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescription' });
    }
};

module.exports = {
    createPrescription,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
    getPrescriptionByPatient,
    getPrescriptionByDoctor,
};
