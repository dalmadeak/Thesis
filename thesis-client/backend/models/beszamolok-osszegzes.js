const mongoose = require('mongoose');
const beszamolok = require('models/beszamolok');

const beszamoloOsszegzesSchema = mongoose.Schema({
  postType: { type: String },
  year: { type: Number, required: true },
  month: { type: String, required: true },
  reports: { type: Array }
});

//this schema needs a model (a definition)
module.exports = mongoose.model('ReportSummary', beszamoloOsszegzesSchema);

