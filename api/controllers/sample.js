const BaseController = require('./base');

class SampleController extends BaseController {
    constructor({ sampleService, logger }) {
        super(sampleService, logger);
    }

    async sampleRequest(req, res) {
        const params = await this._validateParams(req.query, ['a']);
        this.logger.info(params);
        res.status(201).json(params);
    }
}

module.exports = SampleController;