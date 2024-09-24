const express = require('express');
const { getAllTreatments, getTreatmentById, createTreatment, updateTreatment, deleteTreatment } = require('../controllers/treatmentController');
const { getAllTreatmentCategories, getTreatmentCategoryById, createTreatmentCategory, updateTreatmentCategory, deleteTreatmentCategory } = require('../controllers/treatmentController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

// treatment category routes
router.get('/categories', isAuthenticated, roleMiddleware('getAllTreatmentCategories'), getAllTreatmentCategories); // get all treatment categories
router.get('/categories/:id', isAuthenticated, roleMiddleware('getTreatmentCategoryById'), getTreatmentCategoryById); // get treatment category by id
router.post('/categories', isAuthenticated, roleMiddleware('createTreatmentCategory'), createTreatmentCategory); // create treatment category
router.put('/categories/:id', isAuthenticated, roleMiddleware('updateTreatmentCategory'), updateTreatmentCategory); // update treatment category
router.delete('/categories/:id', isAuthenticated, roleMiddleware('deleteTreatmentCategory'), deleteTreatmentCategory); // delete treatment category

// treatment routes
router.get('/', isAuthenticated, roleMiddleware('getAllTreatments'), getAllTreatments); // get all treatments
router.get('/:id', isAuthenticated, roleMiddleware('getTreatmentById'), getTreatmentById); // get treatment by id
router.post('/', isAuthenticated, roleMiddleware('createTreatment'), createTreatment); // create treatment
router.put('/:id', isAuthenticated, roleMiddleware('updateTreatment'), updateTreatment); // update treatment
router.delete('/:id', isAuthenticated, roleMiddleware('deleteTreatment'), deleteTreatment); // delete treatment

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;
