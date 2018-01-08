const _ = require('lodash');
const config = require('config');

class BaseController {
  constructor(service) {
    this._service = service;
  }

  static async validateParams(params, requiredFields = []) {
    if (!params) {
      throw Error(config.errors.INVALID_PARAMETERS);
    } else if (!_.isArray(requiredFields)) {
      throw Error(config.errors.SHOULD_BE_ARRAY);
    } else if (_.isEmpty(requiredFields)) {
      return params;
    }
    requiredFields.forEach((field) => {
      if (!params[field]) {
        throw Error(`missing parameter: ${field}`);
      }
    });
    return params;
  }
}

module.exports = BaseController;
