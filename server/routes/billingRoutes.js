const express = require('express');
const { getAllBillings, createBilling, addPayment, applyDiscount, getBillingById, getBillingByPatient, updateBilling, deleteBilling } = require('../controllers/billingController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, roleMiddleware('getBillings'), getAllBillings); // get all billings
router.post('/', isAuthenticated, roleMiddleware('createBilling'), createBilling); // create billing
router.post('/add-payment', isAuthenticated, roleMiddleware('addPayment'), addPayment); // add payment
router.post('/apply-discount', isAuthenticated, roleMiddleware('applyDiscount'), applyDiscount); // apply discount
router.get('/:id', isAuthenticated, roleMiddleware('getBillingById'), getBillingById); // get billing by id
router.get('/patient/:id', isAuthenticated, roleMiddleware('getBillingByPatient'), getBillingByPatient); // get billing by patient
router.put('/:id', isAuthenticated, roleMiddleware('updateBilling'), updateBilling); // update billing
router.delete('/:id', isAuthenticated, roleMiddleware('deleteBilling'), deleteBilling); // delete billing

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;