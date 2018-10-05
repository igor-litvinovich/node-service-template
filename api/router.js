const { get } = require('lodash');
const config = require('config');
const express = require('express');
const routes = require('./routes.json');

module.exports = (controllersMap, logger, diContainer) => {
  const router = express.Router();
  const controllers = {};
  if (routes && !Array.isArray(routes)) {
    throw Error(config.errors.REG_ROUTES_ERROR);
  }
  routes.forEach((route) => {
    const httpMethod = route.method;
    try {
      controllers[route.controller] = controllers[route.controller] || controllersMap[route.controller];
      const controller = controllers[route.controller];
      if (!controller[route.action]) {
        throw Error(config.errors.NO_ENDPOINTS_FOUND);
      }
      const action = (req, res, next) => Promise.resolve(controller[route.action].call(controller, req, res, next)).catch(next);
      const middlewares = [];
      if (Array.isArray(route.middlewares)) {
        route.middlewares.forEach((middleware) => {
          const resolvedMiddleware = diContainer.resolve(middleware.diName);
          let finalMiddleware = resolvedMiddleware;
          if (!middleware.isRoot) {
            finalMiddleware = get(resolvedMiddleware, middleware.propertyPath);
          }

          if (middleware.shouldBeInvoked) {
            middlewares.push(finalMiddleware(...middleware.args));
          } else {
            middlewares.push(finalMiddleware);
          }
        });
      }
      router[httpMethod](route.url, ...middlewares, action);
      logger.info(`Applied ${middlewares.length} middleware for ${route.url}`);
    } catch (err) {
      logger.error(`Register route - ${JSON.stringify(route)}. Reason: ${err.message}`);
    }
  });
  return router;
};
