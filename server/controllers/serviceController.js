const Service = require('../models/Service');
const Department = require('../models/Department');


const createService = async (req, res) => {
    const service = req.body;
    try {
        const newService = await Service.create(service);
        if (newService) {
            res.status(201).json(newService);
        } else {
            res.status(400).json({ message: "Failed to create service" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        if (services) {
            res.status(200).json(services);
        } else {
            res.status(204).json({ message: "No services found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getServiceById = async (req, res) => {
    const id = req.params.id;
    try {
        const service = await Service.findById(id);
        if (service) {
            res.status(200).json(service);
        } else {
            res.status(204).json({ message: "No service found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateService = async (req, res) => {
    const id = req.params.id;
    const service = req.body;
    try {
        const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });
        if (updatedService) {
            res.status(200).json(updatedService);
        } else {
            res.status(400).json({ message: "Failed to update service" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteService = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedService = await Service.findByIdAndDelete(id);
        if (deletedService) {
            res.status(200).json(deletedService);
        } else {
            res.status(400).json({ message: "Failed to delete service" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// add list of services
const addManyServices = async (req, res) => {
    const services = req.body;
    if (!services || !services.length) {
        return res.status(400).json({ message: "No services provided" });
    }
    try {
        const newServices = await Service.insertMany(services);
        if (newServices) {
            res.status(201).json(newServices);
        } else {
            res.status(400).json({ message: "Failed to create services" });
        }
    } catch (error) {
        if (error.name === "BulkWriteError") {
            const errors = error.writeErrors.map(err => err.errmsg);
            return res.status(400).json({ message: errors.join(", ") });
        }
        res.status(500).json({ message: error.message });
    }
};
// exports all functions
module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    addManyServices
}
