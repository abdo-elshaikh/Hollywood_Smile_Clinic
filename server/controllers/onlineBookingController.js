const OnlineBooking = require('../models/OnlineBooking');

const getAllOnlineBooking = async (req, res) => {
    try {
        const onlineBooking = await OnlineBooking.find();
        if (onlineBooking) {
            res.status(200).json(onlineBooking);
        } else {
            res.status(204).json({ message: "No online booking found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOnlineBookingById = async (req, res) => {
    const id = req.params.id;
    try {
        const onlineBooking = await OnlineBooking.findById(id).populate('doctor');
        if (onlineBooking) {
            res.status(200).json(onlineBooking);
        } else {
            res.status(204).json({ message: "No online booking found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOnlineBooking = async (req, res) => {
    const onlineBooking = new OnlineBooking(req.body);
    try {
        const newOnlineBooking = await onlineBooking.save();
        if (newOnlineBooking) {
            res.status(201).json(newOnlineBooking);
        } else {
            res.status(400).json({ message: "Failed to create online booking" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOnlineBooking = async (req, res) => {
    const id = req.params.id;
    const onlineBooking = req.body;
    try {
        const updatedOnlineBooking = await OnlineBooking.findByIdAndUpdate(id, onlineBooking, { new: true });
        if (updatedOnlineBooking) {
            res.status(200).json(updatedOnlineBooking);
        } else {
            res.status(400).json({ message: "Failed to update online booking" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOnlineBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedOnlineBooking = await OnlineBooking.findByIdAndDelete(id);
        if (deletedOnlineBooking) {
            res.status(200).json(deletedOnlineBooking);
        } else {
            res.status(400).json({ message: "Failed to delete online booking" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const changeStatusBooking = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    try {
        const updatedOnlineBooking = await OnlineBooking.findByIdAndUpdate(id, { bookStatus: status }, { new: true });
        if (updatedOnlineBooking) {
            res.status(200).json(updatedOnlineBooking);
        } else {
            res.status(400).json({ message: "Failed to update online booking" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllOnlineBooking,
    getOnlineBookingById,
    createOnlineBooking,
    updateOnlineBooking,
    deleteOnlineBooking,
    changeStatusBooking
}