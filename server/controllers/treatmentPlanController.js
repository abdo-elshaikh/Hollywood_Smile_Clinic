const TreatmentPlan = require('../models/TreatmentPlan');

// Create a new treatment plan (either custom or default)
const createTreatmentPlan = async (req, res) => {
    const treatmentPlan = req.body;

    try {
        const newtreatmentPlan = await treatmentPlan.create(treatmentPlan);
        if (newtreatmentPlan) {
            res.status(201).json(newtreatmentPlan);
        } else {
            res.status(400).json({ error: 'Failed to create treatment plan' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create treatment plan' });
    }
};

// Get all treatment plans
const getAllTreatmentPlans = async (req, res) => {
    try {
        const treatmentPlans = await TreatmentPlan.find();
        res.status(200).json(treatmentPlans);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch treatment plans' });
    }
};

// Get a specific treatment plan by ID
const getTreatmentPlanById = async (req, res) => {
    const { id } = req.params;

    try {
        const treatmentPlan = await TreatmentPlan.findById(id);
        if (!treatmentPlan) {
            return res.status(404).json({ error: 'Treatment Plan not found' });
        }
        res.status(200).json(treatmentPlan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch treatment plan' });
    }
};

// Update a treatment plan
const updateTreatmentPlan = async (req, res) => {
    const { id } = req.params;
    const treatmentPlan = req.body;

    try {
        const updatedtreatmentPlan = await TreatmentPlan.findByIdAndUpdate(id, treatmentPlan, { new: true });
        if (!updatedtreatmentPlan) {
            return res.status(404).json({ error: 'Treatment Plan not found' });
        }

        res.status(200).json({ message: 'Treatment Plan updated successfully', updatedtreatmentPlan });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update treatment plan' });
    }
};

// Delete a treatment plan
const deleteTreatmentPlan = async (req, res) => {
    const { id } = req.params;

    try {
        const treatmentPlan = await TreatmentPlan.findByIdAndDelete(id);
        if (!treatmentPlan) {
            return res.status(404).json({ error: 'Treatment Plan not found' });
        }
        res.status(200).json({ message: 'Treatment Plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete treatment plan' });
    }
};

// Get treatment plans by status
const getTreatmentPlanByType = async (req, res) => {
    const { type } = req.params;
    try {
        const treatmentPlans = await TreatmentPlan.find({ type: type });
        res.status(200).json(treatmentPlans);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch treatment plans' });
    }
};

module.exports = {
    createTreatmentPlan,
    getAllTreatmentPlans,
    getTreatmentPlanById,
    updateTreatmentPlan,
    deleteTreatmentPlan,
    getTreatmentPlanByType
};