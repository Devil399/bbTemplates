var mongoose = require('mongoose');
var crypto = require('crypto');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  salt: {type: String, required: true, default: uuid.v1},
  passwordHash: {type: String, required: true},
  admin: {type: Boolean, default: false},
  name: {type: String, required: true},
  createdOn: {type: Date, default: new Date()}
});

var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};

UserSchema.methods.setPassword = function(passwordString) {
    this.passwordHash = hash(passwordString, this.salt);
};

UserSchema.methods.isValidPassword = function(passwordString) {
    if(passwordString === undefined){return false;}
    return this.passwordHash === hash(passwordString, this.salt);
};

module.exports = mongoose.model('User', UserSchema);
