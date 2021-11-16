const mongoose = require('mongoose');

const ulesekSchema = mongoose.Schema({
  author: { type: String },
  postType: { type: String },
  committee: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  decisionDate: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  files: { type: Array }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Meeting', ulesekSchema);

