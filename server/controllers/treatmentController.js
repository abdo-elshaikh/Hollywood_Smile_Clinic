const Treatment = require('../models/Treatment');
const TreatmentCategory = require('../models/TreatmentCategory');

const createTreatmentCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const treatmentCategory = new TreatmentCategory({ name, description });
        await treatmentCategory.save();
        res.status(201).json({ message: 'Treatment category created successfully', treatmentCategory });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create treatment category' });
    }
}

const updateTreatmentCategory = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const treatmentCategory = TreatmentCategory.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!treatmentCategory) {
            return res.status(404).json({ error: 'Treatment category not found' });
        }
        res.status(200).json(treatmentCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update treatment category' });
    }
}

const deleteTreatmentCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const treatmentCategory = await TreatmentCategory.findByIdAndDelete(id);
        if (!treatmentCategory) {
            return res.status(404).json({ error: 'Treatment category not found' });
        }
        res.status(200).json({ message: 'Treatment category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete treatment category' });
    }
}

const getAllTreatmentCategories = async (req, res) => {
    try {
        const treatmentCategories = await TreatmentCategory.find();
        res.status(200).json(treatmentCategories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch treatment categories' });
    }
}

const getTreatmentCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const treatmentCategory = await TreatmentCategory.findById(id);
        if (!treatmentCategory) {
            return res.status(404).json({ error: 'Treatment category not found' });
        }
        res.status(200).json(treatmentCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch treatment category' });
    }
}

// Get all treatments
const getAllTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find();
        res.status(200).json(treatments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch treatments' });
    }
}

const getTreatmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const treatment = await Treatment.findById(id);
        if (!treatment) {
            return res.status(404).json({ error: 'Treatment not found' });
        }
        res.status(200).json(treatment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch treatment' });
    }
}

const updateTreatment = async (req, res) => {
    const { id } = req.params;
    const treatment = req.body;
    try {
        const updatedTreatment = await Treatment.findByIdAndUpdate(id, treatment, { new: true });
        if (!treatment) {
            return res.status(404).json({ error: 'Treatment not found' });
        }
        res.status(200).json({ message: 'Treatment updated successfully', updatedTreatment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update treatment' });
    }
}

const deleteTreatment = async (req, res) => {
    const { id } = req.params;
    try {
        const treatment = await Treatment.findByIdAndDelete(id);
        if (!treatment) {
            return res.status(404).json({ error: 'Treatment not found' });
        }
        res.status(200).json({ message: 'Treatment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete treatment' });
    }
}

const createTreatment = async (req, res) => {
    const treatment = req.body;
    try {
        const newTreatment = await Treatment.create(treatment);
        if (!newTreatment) {
            return res.status(400).json({ error: 'Failed to create treatment' });
        }
        res.status(201).json({ message: 'Treatment created successfully', treatment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create treatment' });
    }
}

module.exports = {
    getAllTreatments,
    getTreatmentById,
    updateTreatment,
    deleteTreatment,
    createTreatment,
    getAllTreatmentCategories,
    getTreatmentCategoryById,
    createTreatmentCategory,
    updateTreatmentCategory,
    deleteTreatmentCategory
}