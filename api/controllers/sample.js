const BaseController = require('./base');

class SampleController extends BaseController {
    constructor(sampleService) {
        super(sampleService);
    }

    async sampleRequest(req, res) {
    const params = await this._validateParams(req.query, ['a']);
        res.status(201).json(params);
    }
}

module.exports = SampleController;