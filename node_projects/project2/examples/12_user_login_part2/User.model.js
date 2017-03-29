var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requiredStringValidator = [
  function(val) {
    var testVal = val.trim();
    return (testVal.length > 0)
  },
  '{PATH} cannot be empty'
];

var UserSchema = new Schema({
  username: {
    type: String,
    validate: requiredStringValidator
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String
});

module.exports = mongoose.model('User', UserSchema);