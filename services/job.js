const BaseService = require('./base');

class JobService extends BaseService {
  constructor({ jobRepository }) {
    super(jobRepository);
  }
}

module.exports = JobService;
