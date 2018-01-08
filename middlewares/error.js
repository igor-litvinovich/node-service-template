module.exports = (err, req, res, next) => {
    const logger = req.app.get('logger');
    logger.error(err);
    res.status(500).send(err);
};