const mongoose = require('mongoose');

const kabinetSchema = mongoose.Schema({
  postType: { type: String },
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true  },
  image: { type: String }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Cabinet', kabinetSchema);

