// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
} = require('../controllers/bookingController'); // Adjust the path as needed

// Create a new booking
router.post('/', createBooking);

// Get all bookings
router.get('/', protect, getAllBookings);

// Get a booking by ID
router.get('/:id', protect, getBookingById);

// Update a booking by ID
router.put('/:id', protect, updateBooking);

// Delete a booking by ID
router.delete('/:id', protect, authorize('admin'), deleteBooking);

module.exports = router;
