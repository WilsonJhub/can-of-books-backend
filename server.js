'use strict';

// Proof of Life
console.log('This is your Can of Books Server')


// 'require' for servers
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const verifyUser = require('./auth')
// bring in mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);


// Bring in a schema to interact with that model
const Books = require('./models/books');
const { response, request } = require('express');


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
const PORT = process.env.PORT || 3002;

// Routes
app.get('/', (request, response) => {
  response.send('200...' + 'Welcome to your Self-Development Library!')
})

// to use verification functionality, paste your existing code inside of this function:
// verifyUser(request, async (err, user) => {
//     if (err) {
//   console.log(err);
//   response.send('invalid token');
//   } else {
//   // insert try catchy logic here. BE CAREFUL. check syntax IMMEDIATELY
//   }
// })


app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks)

// Gets Book information Function
async function getBooks (request, response, next) {
  verifyUser(request, async (err, user) => {
    if (err) {
      console.log(err);
      response.send('invalid token');
    } else {
      const searchObject = {} 
      if (request.query.email) {
        searchObject.email = request.query.email;
        // insert try catchy logic here. BE CAREFUL. check syntax IMMEDIATELY
        try {
          let results = await Books.find();
          response.status(200).send(results);
        } catch(err){
          next(err);
        }
      }
    }
  })
}
  

// Add(post) Books Function
async function postBooks (request, response, next) {
  console.log(request.body);
  try{
    let createdBook = await Books.create(request.body);
    response.status(200).send(createdBook)
  }catch(err) {
    next(err);
  }
}

// Delete Books Function
async function deleteBooks (request, response, next) {
  let id = request.params.id;
  console.log(id);
  try {
    await Books.findByIdAndDelete(id);
    response.status(200).send('Book has been deleted');
  } catch (err){
    next(err);
  }
}

//PUT Function(UPDATE the information of the book.)
async function putBooks (request, response, next) {
  let id = request.params.id;
  // data about the updated Book will be in request.body 
  try {
    //findByIdAndUpdate() method takes in 3 arguments
    // - 1. ID of the thing in the database to update
    // - 2. The updated data
    // - 3. An options object
    let updatedBook = await Books.findByIdAndUpdate(id, request.body, 
      { new: true, overwrite: true })
      response.status(200).send(updatedBook)
  } catch(err) {
    next(err);

  }
}


app.listen(PORT, () => console.log(`listening on ${PORT}`));
