const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const passport = require('passport');
const logger = require('./services/logger');
require('./services/db');
require('./services/auth/passport-JWT');
require('./services/auth/passport-google-token');
// require('./services/auth/passport-local');

app.use(passport.initialize());

app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
  /* setting up error message to be decalred if something throws an error */
  const { statusCode = 500, message = 'Something went wrong' } = err;
  logger.error(err);
  return res.status(statusCode).json({ success: false, message });
});
// starting express api server
app.listen(process.env.PORT, () => {
  logger.info(`Server started on port ${process.env.PORT}`);
});
