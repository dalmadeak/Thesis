const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
  postType: { type: String },
  identifier: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
});

//this schema needs a model (a definition)
module.exports = mongoose.model('User', authSchema);

