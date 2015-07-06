var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
  name: String,
  price: Number,
  url: String,
  createdBy: String,
  createdOn: {type: Date, default: new Date()},
  likedBy: [String],
  likes: {type: Number, default: 0},
  dislikes: {type: Number, default: 0},
  dislikedBy: [String]
});

module.exports = mongoose.model('Template', TemplateSchema);
