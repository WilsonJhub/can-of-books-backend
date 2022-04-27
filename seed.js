'use strict'

require('dotenv').config();
const mongoose = require('mongoose');

// create a connection to the database long enough to pull the info. Then you can disconnect.
mongoose.connect(process.env.DB_URL);
const Books = require('./models/books');

async function seed() {
  // structure is the same as your Book Schema
  await Books.create({
    title: 'Think and Grow Rich',
    description: 'A curation of the 13 most common habits of wealthy and successful people, distilled from studying over 500 individuals over the course of 20 years.',
    author: 'Napoleon Hill',
    status: 'Whatever Your Mind Can Conceive and Believe, It Can Achieve.'
  });
console.log('Think and Grow Rich was added');

  await Books.create({
    title: "Richest Man in Babylon",
    description: "The classic principle of paying yourself first. George S. Clason recommends saving at least 10% of all income earned. Even in his example of those who are paying off debt, he still advocates setting aside this one-tenth.",
    author: "George S. Clason",
    status: "“Our acts can be no wiser than our thoughts.”"
  });
  console.log('Richest Man in Babylon was added');
  
  await Books.create({
    title: "The Power of Now",
    description: "A spiritual self-help guide to help us discover our true Being, release our pain and find deep inner peace. When we are intensely present in the Now, we respond from deep consciousness and flow with ease and joy in life.",
    author: "Eckhart Tolle",
    status: "“Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life.”"
  });
  console.log('The Power of Now was added');
  mongoose.disconnect();
}

seed();