'use strict';

// Proof of Life
console.log('This is your Can of Books Server')


// 'require' for servers
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);


// Bring in a schema to interact with that model
const Books = require('./models/books');


// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


// implement express
const app = express();

// middleware
app.use(cors());

// If we want to receive JSON data from a request, we need this:
app.use(express.json());


// define PORT validate env is working
const PORT = process.env.PORT || 3001;

// Routes
app.get('/', (request, response) => {
  response.send('200...' + 'Welcome to your Self-Development Library!')
})

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);

// Get Book information Function
async function getBooks(request, response, next) {
  try {
    let results = await Books.find();
    response.status(200).send(results);
  } catch(err){
    next(err);
  }
}

// Add Books Function
async function postBooks(request, response, next) {
  console.log(request.body);
  try{
    let createdBook = await Books.create(request.body);
    response.status(200).send(createdBook)
  }catch(err) {
    next(err);
  }
}

// Delete Books Function
async function deleteBooks(request, response, next) {
  let id = request.params.id;
  console.log(id);
  try {
    await Books.findByIdAndDelete(id);
    response.status(200).send('Book has been deleted');
  } catch (err){
    next(err);
  }
}



app.listen(PORT, () => console.log(`listening on ${PORT}`));
