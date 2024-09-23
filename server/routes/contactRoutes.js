const expression = require('express');
const { getAllContacts, createContact,  deleteContact, changeContactStatus } = require('../controllers/contactController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = expression.Router();

router.get('/', isAuthenticated, getAllContacts); // get all contacts
router.post('/', createContact); // create contact
router.delete('/:id', isAuthenticated, deleteContact); // delete contact
router.put('/:id', isAuthenticated, changeContactStatus); // change contact status

// handle errors
router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = router;