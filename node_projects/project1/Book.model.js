var mongoose = require('mongoose');
// I'm curious how these things work with import 
var Schema = mongoose.Schema;
// grabbing class from Mongoose 
var BookSchema = new Schema({
  title: String,
  author: String,
  category: String
});

module.exports = mongoose.model('Book', BookSchema);