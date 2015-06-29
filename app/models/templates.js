var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
  name: String,
  price: Number,
  url: String,
  createdBy: String,
  createdOn: { type: Date, default: Date() }
});

module.exports = mongoose.model('Template', TemplateSchema)
