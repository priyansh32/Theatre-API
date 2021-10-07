const Movie = require('../models/movie');

module.exports.getMovies = async (req, res) => {
  const movies = await Movie.find(req.query);
  res.json({
    success: true,
    message: 'Movies fetched successfully',
    movies,
  });
};

module.exports.getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json({
    success: true,
    message: 'Movie fetched successfully',
    movie,
  });
};

module.exports.addMovie = async (req, res) => {
  const {
    title,
    year,
    rating,
    genre,
    actors,
    plot,
    ratings,
    runtime,
  } = req.body;

  const movie = new Movie({
    title,
    year,
    rating,
    genre,
    actors,
    plot,
    ratings,
    runtime,
  });

  await movie.save();
  res.json({
    success: true,
    message: 'Movie added successfully',
    movie,
  });
};

module.exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(movie);
};

module.exports.bookMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    $push: {
      bookings: req.body.booking,
    },
  });
  res.json(movie);
};
