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
app.use(cors());

// define PORT validate env is working
const PORT = process.env.PORT || 3001;

// Routes
app.get('/', (request, response) => {
  response.send('200...' + 'Welcome to your Self-Development Library!')
})

app.get('/books', getBooks);
app.post('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Books.find();
    response.status(200).send(results);
  } catch(err){
    next(err);
  }
}

async function postBooks(request, response, next)



app.listen(PORT, () => console.log(`listening on ${PORT}`));
