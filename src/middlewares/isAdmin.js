module.exports = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    return next();
  }
  return res
    .status(403)
    .json({ success: false, message: 'Why would you try that?' });
};
