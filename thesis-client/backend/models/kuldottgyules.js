const mongoose = require('mongoose');

const kuldottgyulesSchema = mongoose.Schema({
  postType: { type: String },
  fullName: { type: String, required: true },
  firstPosition: { type: String, required: true },
  firstCommittee: { type: String, required: true },
  secondPosition: { type: String, required: true },
  secondCommittee: { type: String },
  email: { type: String }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('Delegate', kuldottgyulesSchema);

