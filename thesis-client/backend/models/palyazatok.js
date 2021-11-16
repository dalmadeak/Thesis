const mongoose = require('mongoose');

const palyazatokSchema = mongoose.Schema({
  postType: { type: String },
  title: { type: String, required: true },
  date: { type: String, required: true },
  files: { type: Array }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Application', palyazatokSchema);

