module.exports = (req, res, next) => {
  req.get('logger').log('sample middleware has been called');
  next();
};
