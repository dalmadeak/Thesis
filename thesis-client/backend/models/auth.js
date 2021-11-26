const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
  postType: { type: String },
  identifier: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  permissions: { type: String, required: true },
  password: { type: String, required: true},
});

module.exports = mongoose.model('User', authSchema);

