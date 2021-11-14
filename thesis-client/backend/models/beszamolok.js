const mongoose = require('mongoose');

const beszamolokSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  files: { type: Array }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Report', beszamolokSchema);

