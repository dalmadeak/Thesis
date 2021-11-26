const mongoose = require('mongoose');

const hirekSchema = mongoose.Schema({
  postType: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true},
  date: { type: String, required: true }
});

module.exports = mongoose.model('Post', hirekSchema);
