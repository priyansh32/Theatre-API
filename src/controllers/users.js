const passport = require('passport');
const jwt = require('jsonwebtoken');
const logger = require('../services/logger');

const generateToken = (email) => {
  const token = jwt.sign({
    email,
  }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

module.exports.GoogleAuth = (req, res, next) => {
  passport.authenticate('google-token', async (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message,
      });
    }
    logger.debug('Google Auth');

    const { email } = user;
    const token = generateToken(email);
    return res.status(200).json({ success: true, token, user });
  })(req, res, next);
};

module.exports.LocalAuth = (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message,
      });
    }
    logger.debug('Local Auth');

    const { username } = user;
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, token, user });
  })(req, res, next);
};
