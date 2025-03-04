
const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  phone: String,
});
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact