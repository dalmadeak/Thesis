const mongoose = require('mongoose');

const kozeletikSchema = mongoose.Schema({
  postType: { type: String },
  name: { type: String, required: true },
  amount: { type: String, required: true  }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('ScholarShip', kozeletikSchema);

