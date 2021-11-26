const mongoose = require('mongoose');

const ulesekSchema = mongoose.Schema({
  postType: { type: String },
  author: { type: mongoose.Schema.Types.Mixed, ref: 'User', required: true },
  committee: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  decisionDate: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Meeting', ulesekSchema);

