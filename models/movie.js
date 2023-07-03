const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'country is required'],
  },
  director: {
    type: String,
    required: [true, 'director is required'],
  },
  duration : {
    type: Number,
    required: [true, 'duration is required'],
  },
  year : {
    type: String,
    required: [true, 'year is required'],
  },
  description : {
    type: String,
    required: [true, 'description is required'],
  },
  image : {
    type: String,
    required: [true, 'image is required'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Invalid link image',
    },
  },
  trailerLink : {
    type: String,
    required: [true, 'trailerLink is required'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Invalid link trailerLink',
    },
  },
  thumbnail : {
    type: String,
    required: [true, 'thumbnail is required'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Invalid link thumbnail ',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId : {
    type: Number,
    required: [true, 'movieId is required'],
  },
  nameRU: {
    type: String,
    required: [true, 'name is required'],
  },
  nameEN: {
    type: String,
    required: [true, 'name is required'],
  },
});

module.exports = mongoose.model('movie', movieSchema);