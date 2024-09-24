const expression =ssion = require('express');
const { getAllServices, getServiceById, createService, updateService, deleteService, addManyServices } = require('../controllers/serviceController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const  { roleMiddleware } = require('../middleware/roleMiddleware');
const router = expression.Router();

router.get('/', isAuthenticated, roleMiddleware('getServices'), getAllServices); // get all services
router.get('/:id', isAuthenticated, roleMiddleware('getServiceById'), getServiceById); // get service by id
router.post('/', isAuthenticated, roleMiddleware('createService'), createService); // create service
router.put('/:id', isAuthenticated, roleMiddleware('updateService'), updateService); // update service
router.delete('/:id', isAuthenticated, roleMiddleware('deleteService'), deleteService); // delete service
router.post('/add-many', isAuthenticated, roleMiddleware('addManyServices'), addManyServices); // add many services

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;