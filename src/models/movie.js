const mongoose = require('mongoose');

const { Schema } = mongoose;

const RatingSchema = new Schema({
  provider: String,
  rating: String,
  votes: Number,
});

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  genre: [{
    type: String,
    required: true,
    enum: ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'],
  }],
  year: {
    type: Number,
    required: true,
  },
  actors: [{
    type: String,
    required: true,
  }],
  // runtime in minutes
  runtime: {
    type: Number,
    required: true,
  },
  ratings: [RatingSchema],
  shows: [{
    type: Schema.Types.ObjectId,
    ref: 'Show',
  }],
});

module.exports = mongoose.model('Movie', MovieSchema);
