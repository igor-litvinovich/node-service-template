const fs = require('fs');
const config = require('config');
const errorMiddleware = require('./error');

module.exports = (app) => {
  const logger = app.get('logger');
  try {
    const files = fs.readdirSync(__dirname, {});
    if (Array.isArray(files)) {
      files.filter(fileName => ![config.middleware.EXCLUDE_FILES].includes(fileName))
        .forEach((file) => {
          const middleware = require(`./${file}`);
          app.use(middleware);
        });
      app.use(errorMiddleware);
    }
  } catch (error) {
    logger.error(Error(config.error.MIDDLEWARE_ERROR));
  }
};
