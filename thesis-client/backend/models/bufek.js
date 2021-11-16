const mongoose = require('mongoose');

const bufekSchema = mongoose.Schema({
  postType: { type: String },
  name: { type: String },
  brief: { type: String },
  openHours: { type: String }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Canteen', bufekSchema);

