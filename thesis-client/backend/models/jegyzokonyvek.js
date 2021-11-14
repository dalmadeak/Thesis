const mongoose = require('mongoose');

const jegyzokonyvekSchema = mongoose.Schema({
  committee: { type: String, required: true },
  title: { type: String, required: true },
  decisionDate: { type: String, required: true },
  date: { type: String, required: true },
  files: { type: Array }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Record', jegyzokonyvekSchema);

