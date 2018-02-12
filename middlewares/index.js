const fs = require('fs');
const config = require('config');
const filesToIgnore = require('./ignore');

module.exports = (app) => {
  const logger = app.get('logger');
  try {
    const files = fs.readdirSync(__dirname, {});
    if (Array.isArray(files)) {
      files.filter(fileName => !filesToIgnore.includes(fileName))
        .forEach((file) => {
          const middleware = require(`./${file}`);
          app.use(middleware);
        });
    }
  } catch (error) {
    logger.error(Error(config.error.MIDDLEWARE_ERROR));
  }
};
