const { Router } = require('express');
const { /* LocalAuth, */ GoogleAuth } = require('../controllers/users');

const router = Router();

/* router
  .route('/local')
  .post(LocalAuth); */

// Authenticating users with Google access token
router
  .route('/googleauth')
  .post(GoogleAuth);

module.exports = router;
