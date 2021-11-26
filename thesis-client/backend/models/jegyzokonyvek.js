const mongoose = require('mongoose');

const jegyzokonyvekSchema = mongoose.Schema({
  postType: { type: String },
  committee: { type: String, required: true },
  title: { type: String, required: true },
  decisionDate: { type: String, required: true },
  date: { type: String, required: true },
  file: { type: String, required: true },
});

module.exports = mongoose.model('Record', jegyzokonyvekSchema);

