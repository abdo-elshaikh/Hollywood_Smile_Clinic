// controllers/bookingController.js

const OnlineBooking = require('../models/OnlineBooking'); // Adjust the path as needed

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const booking = new OnlineBooking(req.body);
        await booking.save();
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await OnlineBooking.find(); // Populate service info
        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get a specific booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await OnlineBooking.findById(req.params.id).populate('service');
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }
        res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    try {
        const booking = await OnlineBooking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await OnlineBooking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
