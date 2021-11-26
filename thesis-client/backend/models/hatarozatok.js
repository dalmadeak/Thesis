const mongoose = require('mongoose');

const hatarozatokSchema = mongoose.Schema({
  postType: { type: String },
  committee: { type: String, required: true },
  title: { type: String, required: true },
  number: { type: String, required: true },
  decisionDate: { type: String, required: true },
  content: { type: String, required: true },
  mandate: { type: Number, required: true },
  vote: { type: String, required: true },
  date: { type: String, required: true },
  file: { type: String },
});

module.exports = mongoose.model('Decision', hatarozatokSchema);

