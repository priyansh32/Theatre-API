const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShowSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    enum: ['12:00', '16:00', '20:00'],
  },
  hall: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tickets: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Show', ShowSchema);
