const contactModel = require('../models/contact.model');

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const rows = await contactModel.getAll();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Server Error');
  }
}

// Add a new contact
const addContact = async (req, res) => {
  const { name, phone, description } = req.body;
  try {
    const contact = await contactModel.create({ name, phone, description });
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).send('Server Error');
  }
}

// Update a contact
const updateContact = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, phone, description } = req.body;
  try {
    const result = await contactModel.updateById(id, { name, phone, description });
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).send('Server Error');
  }
}

// Delete a contact
const deleteContact = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await contactModel.deleteById(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
};