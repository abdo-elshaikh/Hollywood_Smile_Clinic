const expression =ssion = require('express');
const { getAllServices, getServiceById, createService, updateService, deleteService, addManyServices } = require('../controllers/serviceController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = expression.Router();

router.get('/', isAuthenticated, getAllServices); // get all services
router.get('/:id', isAuthenticated, getServiceById); // get service by id
router.post('/', isAuthenticated, createService); // create service
router.put('/:id', isAuthenticated, updateService); // update service
router.delete('/:id', isAuthenticated, deleteService); // delete service
router.post('/add-many', isAuthenticated, addManyServices); // add many services

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;