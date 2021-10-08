const router = require('express').Router();
const catchAsync = require('../utils/catchasync');
const checkAuth = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');

const {
  getMovies,
  addMovie,
  getMovie,
  updateMovie,
} = require('../controllers/movies');

router
  .route('/')
  .get(catchAsync(getMovies))
  .post(
    checkAuth,
    isAdmin,
    catchAsync(addMovie),
  );

router
  .route('/:id')
  .get(catchAsync(getMovie))
  .put(
    checkAuth,
    isAdmin,
    catchAsync(updateMovie),
  );

module.exports = router;
