const mongoose = require('mongoose');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: String,
    year: Number,
    rating: Number,
    plot: String,
    runtime: String,
    genre: [{ type: String }],
    director: String,
    creator: [{ type: String }],
    cast: [{ type: String }],
    filmType: String,
    image: String,
  })
);
module.exports = Movie;
