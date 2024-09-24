const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { getAllTreatmentPlans, getTreatmentPlanById, createTreatmentPlan, updateTreatmentPlan, deleteTreatmentPlan } = require('../controllers/treatmentPlanController');
const router = express.Router();

router.get('/', isAuthenticated, roleMiddleware('getAllTreatmentPlans'), getAllTreatmentPlans); // get all treatment plans
router.get('/:id', isAuthenticated, roleMiddleware('getTreatmentPlanById'), getTreatmentPlanById); // get treatment plan by id
router.post('/', isAuthenticated, roleMiddleware('createTreatmentPlan'), createTreatmentPlan); // create treatment plan
router.put('/:id', isAuthenticated, roleMiddleware('updateTreatmentPlan'), updateTreatmentPlan); // update treatment plan
router.delete('/:id', isAuthenticated, roleMiddleware('deleteTreatmentPlan'), deleteTreatmentPlan); // delete treatment plan


// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;