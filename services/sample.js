const BaseService = require('./base');

class SampleService extends BaseService {
    constructor(repository) {
        super(repository);
    }
}

module.exports = SampleService;