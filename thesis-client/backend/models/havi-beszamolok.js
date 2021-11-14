const mongoose = require('mongoose');

const havibeszamolokSchema = mongoose.Schema({
  author: { type: String },
  year: { type: String, required: true },
  month: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
});

//this schema needs a model (a definition)
module.exports = mongoose.model('MonthlyReport', havibeszamolokSchema);

