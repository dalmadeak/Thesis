const mongoose = require('mongoose');

const havibeszamolokSchema = mongoose.Schema({
  postType: { type: String },
  author: { type: mongoose.Schema.Types.Mixed, ref: 'User', required: true  },
  year: { type: String, required: true },
  month: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('MonthlyReport', havibeszamolokSchema);

