const Contact = require('../models/Contact');
const moment = require('moment');

// create contact minimum time 24 hours after creation from same browser
const createContact = async (req, res) => {
    const contact = req.body;
    try {
        // check if contact already exists
        const existingContact = await Contact.findOne({ email: contact.email });
        const currentDate = moment().format();
        if (existingContact) {
            const contactDate = moment(existingContact.date).format();
            const diffInHours = moment(currentDate).diff(moment(contactDate), 'hours');
            if (diffInHours < 24) {
                return res.status(400).json({ message: 'Cannot create contact in less than 24 hours, please try again' });
            }
        }

        // create new contact
        // contact date is set to current date
        contact.date = currentDate;
        const newContact = await Contact.create(contact);
        if (newContact) {
            res.status(201).json(newContact);
        } else {
            res.status(400).json({ message: 'Failed to create contact' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changeContactStatus = async (req, res) => {
    const id = req.params.id;
    const contact = req.body;
    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, contact, { new: true });
        if (updatedContact) {
            res.status(200).json(updatedContact);
        } else {
            res.status(400).json({ message: 'Failed to update contact' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteContact = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (deletedContact) {
            res.status(200).json(deletedContact);
        } else {
            res.status(400).json({ message: 'Failed to delete contact' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (contacts) {
            res.status(200).json(contacts);
        } else {
            res.status(204).json({ message: 'No contacts found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createContact,
    changeContactStatus,
    deleteContact,
    getAllContacts
}
