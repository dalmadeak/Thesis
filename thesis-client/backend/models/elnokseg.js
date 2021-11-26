const mongoose = require('mongoose');

const elnoksegSchema = mongoose.Schema({
  postType: { type: String },
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true  },
  file: { type: String, required: true },
});

module.exports = mongoose.model('Presidium', elnoksegSchema);

