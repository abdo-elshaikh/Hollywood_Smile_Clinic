const express = require('express');
const { getAllOnlineBooking, getOnlineBookingById, createOnlineBooking, updateOnlineBooking, deleteOnlineBooking, changeStatusBooking } = require('../controllers/OnlineBookingController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, getAllOnlineBooking); // get all online booking
router.get('/:id', isAuthenticated, getOnlineBookingById); // get online booking by id
router.post('/', createOnlineBooking); // create online booking
router.put('/:id', isAuthenticated, updateOnlineBooking); // update online booking
router.delete('/:id', isAuthenticated, deleteOnlineBooking); // delete online booking
router.put('/change-status/:id', isAuthenticated, changeStatusBooking); // change status online booking

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
