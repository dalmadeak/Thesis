const mongoose = require('mongoose');

const belepokartyaSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  neptun: { type: String, required: true },
  email: { type: String, required: true },
  studentId: { type: String, required: true },
  card: { type: String },
  permissions: { type: String },
  date: { type: String },
  returnDate: { type: String },
  reason: { type: String, required: true },
  isApproved: { type: Boolean }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('EntranceCard', belepokartyaSchema);
