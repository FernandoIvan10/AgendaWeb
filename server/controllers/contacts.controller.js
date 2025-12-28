const contactModel = require('../models/contact.model');
const { areStrings } = require('../utils/validators');

const getContacts = async (req, res) => {// Get all contacts
  try {
    const rows = await contactModel.getAll();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}

const addContact = async (req, res) => {// Add a new contact
  const { name, phone, description } = req.body;
  // Name and phone are required
  if(!name || !phone)
    return res.status(400).json({ error: 'Missing fields' });
  // Name, phone, and description must be strings
  if(
    !areStrings(name, phone) 
    || (description !== undefined && !areStrings(description))
  ) {
    return res.status(400).json({ error: 'Invalid field types' });
  }

  try {
    const contact = await contactModel.create({ name, phone, description });
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}

const updateContact = async (req, res) => {// Update a contact
  const id = Number(req.params.id);
  const { name, phone, description } = req.body;

  // ID must be a valid integer
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  // Name, and phone are required
  if(!name || !phone)
    return res.status(400).json({ error: 'Missing fields' });
  // Name, phone, and description must be strings
  if(
    !areStrings(name, phone)
    || (description && !areStrings(description))
  ) {
    return res.status(400).json({ error: 'Invalid field types' });
  }

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

const deleteContact = async (req, res) => { // Delete a contact
  const id = Number(req.params.id);
  
  // ID must be a valid integer
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  
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