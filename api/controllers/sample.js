const BaseController = require('./base');

class SampleController extends BaseController {
  constructor({ sampleService, logger }) {
    super(sampleService, logger);
  }

  async sampleRequest(req, res) {
    const params = await this._validateParams(req.query, ['a']);
    const result = await this._service.sampleRequest(params);
    this.logger.info(result);
    res.status(201).json(result);
  }
}

module.exports = SampleController;
