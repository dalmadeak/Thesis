const mongoose = require('mongoose');

const beszamolokSchema = mongoose.Schema({
  postType: { type: String },
  title: { type: String, required: true },
  date: { type: String, required: true },
  file: { type: String, required: true },
});

module.exports = mongoose.model('Report', beszamolokSchema);

