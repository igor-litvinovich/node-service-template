const config = require('config');
const router = require('./../api/router');
const logger = require('noogger').init(config.get('loggerParams'));
const { createContainer, asClass, asValue } = require('awilix');
const controllers = require('./controllers');
const services = require('./services');

const convertArrayToObject = (classesArray, transform) => {
  const resultConfigObject =
        classesArray.reduce((result, { name, instance }) => ({
          ...result,
          [name]: transform ? transform(instance) : instance,
        }), {});
  return resultConfigObject;
};

module.exports = () => {
  const container = createContainer();
  container.register({
    logger: asValue(logger),
  });
  container.register(convertArrayToObject(controllers, asClass));
  container.register(convertArrayToObject(services, asClass));
  container.register({
    controllersMap: asValue(convertArrayToObject(controllers, container.build)),
  });

  return container;
};
