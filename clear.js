'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose = connect(process.env.DB_URL);

const Books = require('./models/books');

async function clear() {
  try {
    await Books.deleteMany({});
    console.log('Books cleared from DB');
  } catch (err){
    console.log(err)
   } finally {
    mongoose.disconnect;
    }
}

clear();