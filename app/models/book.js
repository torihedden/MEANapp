// app/models/todo.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

//here's where we construct what each book entry is going to look like.
module.exports = mongoose.model('Book', {
  text : String,
  author : String,
  checkedOut : Boolean
});
