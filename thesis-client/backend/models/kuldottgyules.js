const mongoose = require('mongoose');

const kuldottgyulesSchema = mongoose.Schema({
  postType: { type: String },
  fullName: { type: String, required: true },
  firstPosition: { type: String, required: true },
  firstCommittee: { type: String, required: true },
  secondPosition: { type: String },
  secondCommittee: { type: String },
  email: { type: String }
});

module.exports = mongoose.model('Delegate', kuldottgyulesSchema);

