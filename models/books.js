'use strict'

// require mongoose.
const mongoose = require('mongoose');

// extracting the schema property from the mongoose object
const { Schema } = mongoose;

// create a book schema, define how our book objects will be structured.
const bookSchema = new Schema ({
  title: {type: String, required: true},
  description: {type: String, required: true},
  author: {type: String, required: true},
  status: {type: String, required: false}
});


// Define our model
// Give it(?) funtionality and the predefined schema to our data.
// Params: A string and a schema
const bookModel = mongoose.model('Book', bookSchema);


module.exports = bookModel