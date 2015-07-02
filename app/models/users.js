var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  password: String,
  type: String,
  name: String,
  createdOn: Date
});

module.exports = mongoose.model('User', UserSchema);
