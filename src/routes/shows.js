const router = require('express').Router();
const catchAsync = require('../utils/catchasync');
const checkAuth = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');

const {
  getShows,
  addShow,
  bookShow,
  cancelBooking,
} = require('../controllers/shows');

router
  .route('/')
  .get(catchAsync(getShows))
  .post(
    checkAuth,
    isAdmin,
    catchAsync(addShow),
  );

router
  .route('/book')
  .post(
    checkAuth,
    catchAsync(bookShow),
  )
  .delete(
    checkAuth,
    catchAsync(cancelBooking),
  );

module.exports = router;
