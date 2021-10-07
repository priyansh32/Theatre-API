const Movie = require('../models/movie');
const Show = require('../models/show');
const User = require('../models/user');

module.exports.addShow = async (req, res, next) => {
  const movie = await Movie.findById(req.body.movie);
  if (!movie) {
    return next({ statusCode: 404, message: 'Movie not found' });
  }
  const show = await Show.findOne({
    movie: req.body.movie,
    date: req.body.date,
    time: req.body.time,
  });
  if (show) {
    return next({ statusCode: 409, message: 'Show already exists' });
  }
  const newShow = new Show(req.body);
  movie.shows.push(newShow._id);
  await newShow.save();
  await movie.save();
  return res.status(201).send(newShow);
};

module.exports.getShows = async (req, res) => {
  const shows = await Show.find(req.query).populate('movie');
  res.json({
    success: true,
    message: 'Shows retrieved successfully',
    shows,
  });
};

module.exports.bookShow = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const show = await Show.findById(req.params.id);
  if (!show) {
    return next({ statusCode: 404, message: 'Show not found' });
  }
  if (user.bookings.includes(show._id)) {
    return next({ statusCode: 409, message: 'Show already booked' });
  }
  user.bookings.push(show._id);
  show.tickets -= 1;
  await user.save();
  await show.save();
  return res.json({
    success: true,
    message: 'Show booked successfully',
  });
};

module.exports.cancelBooking = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const show = await Show.findById(req.params.id);
  if (!show) {
    return next({ statusCode: 404, message: 'Show not found' });
  }
  if (!user.bookings.includes(show._id)) {
    return next({ statusCode: 409, message: 'Show not booked' });
  }
  user.bookings.pull(show._id);
  show.tickets += 1;
  await user.save();
  await show.save();
  return res.json({
    success: true,
    message: 'Show cancelled successfully',
  });
};
