const express = require('express');
const { getContacts, addContact, updateContact, deleteContact } = require('../controllers/contacts.controller');
const router = express.Router();

// Get all contacts
router.get('/contacts', getContacts)

// Add a new contact
router.post('/contacts', addContact);

// Update a contact
router.put('/contacts/:id', updateContact);

// Delete a contact
router.delete('/contacts/:id', deleteContact);

module.exports = router;