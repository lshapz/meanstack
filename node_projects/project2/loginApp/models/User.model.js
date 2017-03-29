var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseHidden = require('mongoose-hidden')()
// don't forget to initialize / call this module
//this does not appear to hide it when you do db.users.find() ! 

var minlength = [3, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({minlength})' ];

var UserSchema = new Schema({
  username: {
    type: String,
    minlength: minlength,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    hide: true
  }
});

UserSchema.plugin(mongooseHidden);
module.exports = mongoose.model('User', UserSchema, 'users');