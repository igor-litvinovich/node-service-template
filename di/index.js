const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('noogger').init(config.get('loggerParams'));
const { createContainer, asClass, asValue } = require('awilix');
const controllers = require('./controllers');
const services = require('./services');
const DbContext = require('../dal/context/db');
const repositories = require('./repositories');
const helpers = require('./helpers');

class DiContainer {
  constructor() {
    if (!DiContainer._instance) {
      this.container = createContainer();
      DiContainer._instance = this;
      logger.info('Di Container has been created.');
    }
    return DiContainer._instance;
  }

  init() {
    this.container.register({
      logger: asValue(logger),
    });
    this.container.register({
      bcrypt: asValue(bcrypt),
    });
    this.container.register({
      jwt: asValue(jwt),
    });

    this.container.register(this._convertArrayToObject(controllers, asClass));
    this.container.register(this._convertArrayToObject(services, asClass));
    this.container.register(this._convertArrayToObject(repositories, asClass));
    this.container.register(this._convertArrayToObject(helpers, asClass));
    this.container.register({ controllersMap: asValue(this._convertArrayToObject(controllers, this.container.build)) });
    this.container.register({ dbContext: asClass(DbContext).singleton() });
  }

  _convertArrayToObject(classesArray, transform) {
    const resultConfigObject = classesArray.reduce((result, { name, instance, isSingleton }) => {
      const transformedInstance = transform ? transform(instance) : instance;

      return {
        ...result,
        [name]: isSingleton ? transformedInstance.singleton() : transformedInstance,
      };
    }, {});
    return resultConfigObject;
  }
}
const diContainer = new DiContainer();
diContainer.init();
module.exports = diContainer.container;