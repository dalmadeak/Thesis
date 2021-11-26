const mongoose = require('mongoose');

const sorompoSchema = mongoose.Schema({
  postType: { type: String },
  fullName: { type: String, required: true },
  neptun: { type: String, required: true },
  plate: { type: String, required: true },
  type: { type: String, required: true },
  card: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String },
  semester: { type: String},
  reason: { type: String },
  isApproved: { type: Boolean }
});

module.exports = mongoose.model('Barrier', sorompoSchema);
