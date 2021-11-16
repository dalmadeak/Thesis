const mongoose = require('mongoose');

const sorompoSchema = mongoose.Schema({
  name: { type: String, required: true },
  neptun: { type: String, required: true },
  plate: { type: String, required: true },
  type: { type: String, required: true },
  card: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String },
  comment: { type: String },
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Barrier', sorompoSchema);
