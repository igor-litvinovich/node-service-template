module.exports = (req, res, next) => {
  console.log('sample middleware has been called');
  next();
};
