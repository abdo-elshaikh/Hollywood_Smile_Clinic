const express = require('express');
const { getAllOnlineBooking, getOnlineBookingById, createOnlineBooking, updateOnlineBooking, deleteOnlineBooking, changeStatusBooking } = require('../controllers/OnlineBookingController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, roleMiddleware('getOnlineBooking'), getAllOnlineBooking); // get all online booking
router.post('/', createOnlineBooking); // create online booking
router.get('/:id', isAuthenticated, roleMiddleware('getOnlineBookingById'), getOnlineBookingById); // get online booking by id
router.put('/:id', isAuthenticated, roleMiddleware('updateOnlineBooking'), updateOnlineBooking); // update online booking
router.delete('/:id', isAuthenticated, roleMiddleware('deleteOnlineBooking'), deleteOnlineBooking); // delete online booking
router.put('/change-status/:id', isAuthenticated, roleMiddleware('changeStatusBooking'), changeStatusBooking); // change status online booking

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
