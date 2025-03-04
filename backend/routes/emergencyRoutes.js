const express = require("express");
const router = express.Router();

const Contact = require("../models/emergencyContactModel");
const authMiddleware = require("../middleware/auth");
// route for adding emergency contacts

// 🟢 Add Contact (Fixed)
router.post('/contacts', authMiddleware, async (req, res) => {
  console.log('Contact add hit')
  const { name, phone } = req.body;
  console.log('📥 Adding contact:', { name, phone, userId: req.userId });

  if (!name || !phone) {
    console.log('❌ Missing contact details');
    return res.status(400).json({ message: 'Name and phone are required' });
  }

  if (!phone.match(/^\d{10}$/)) {
    console.log('❌ Invalid phone number:', phone);
    return res.status(400).json({ message: 'Invalid phone number. Must be 10 digits.' });
  }

  try {
    // Check if the contact already exists for the user
    const existingContact = await Contact.findOne({ userId: req.userId, phone });
    if (existingContact) {
      console.log('❌ Contact already exists:', existingContact);
      return res.status(400).json({ message: 'Contact with this phone number already exists.' });
    }

    const newContact = new Contact({ userId: req.userId, name, phone });
    await newContact.save();
    console.log('✅ Contact saved:', newContact);
    res.status(201).json({ message: 'Contact added successfully', contact: newContact });
  } catch (error) {
    console.error('❌ Error adding contact:', error);
    res.status(500).json({ message: 'Error adding contact', error });
  }
});

// 🟢 Fetch All Contacts for Logged-in User (Fixed)
router.get('/contacts', authMiddleware, async (req, res) => {
  console.log('📤 Fetching contacts for user:', req.userId);
  try {
    const contacts = await Contact.find({ userId: req.userId }).sort({ name: 1 }); // Sorted alphabetically by name
    console.log('✅ Contacts fetched:', contacts);
    res.status(200).json(contacts);
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
});

// 🟢 Modify Contact (New Endpoint)
router.put('/contacts/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    console.log('❌ Missing contact details');
    return res.status(400).json({ message: 'Name and phone are required' });
  }

  if (!phone.match(/^\d{10}$/)) {
    console.log('❌ Invalid phone number:', phone);
    return res.status(400).json({ message: 'Invalid phone number. Must be 10 digits.' });
  }

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name, phone },
      { new: true }
    );

    if (!updatedContact) {
      console.log('❌ Contact not found or unauthorized');
      return res.status(404).json({ message: 'Contact not found' });
    }

    console.log('✅ Contact updated:', updatedContact);
    res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
  } catch (error) {
    console.error('❌ Error updating contact:', error);
    res.status(500).json({ message: 'Error updating contact', error });
  }
});

// 🟢 Delete Contact (Fixed)
router.delete('/contacts/:id', authMiddleware, async (req, res) => {
  console.log(`🗑️ Deleting contact: ${req.params.id} for user: ${req.userId}`);
  try {
    const deletedContact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deletedContact) {
      console.log('❌ Contact not found or unauthorized');
      return res.status(404).json({ message: 'Contact not found' });
    }
    console.log('✅ Contact deleted:', deletedContact);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error });
  }
});module.exports = router;
