const BaseService = require('./base');

class SampleService extends BaseService {
  constructor({ logger }) {
    super();
    this._logger = logger;
  }
  sampleRequest(params) {
    this._logger.info('service method has been called');
    return params;
  }
}

module.exports = SampleService;
