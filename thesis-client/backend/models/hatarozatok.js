const mongoose = require('mongoose');

const hatarozatokSchema = mongoose.Schema({
  committee: { type: String, required: true },
  number: { type: String, required: true },
  decisionDate: { type: String, required: true },
  content: { type: String, required: true },
  mandate: { type: Number, required: true },
  vote: { type: String, required: true },
  date: { type: String, required: true },
  files: { type: Array }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Decision', hatarozatokSchema);

