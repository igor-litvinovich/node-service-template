module.exports = (err, req, res, next) => {
  const logger = req.app.get('logger');
  logger.error(`Error middleware: ${err}`);
  res.status(500).send(err);
};
