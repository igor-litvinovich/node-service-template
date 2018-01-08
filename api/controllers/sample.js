const BaseController = require('./base');

class SampleController extends BaseController {
  constructor(sampleService) {
    super(sampleService);
  }

  async sampleRequest(req, res) {
    const params = await SampleController.validateParams(req.query, ['a']);
    const response = await this._service.sampleRequest(params);
    res.status(201).json(response);
  }
}

module.exports = SampleController;
