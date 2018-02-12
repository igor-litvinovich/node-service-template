const Job = require('../models/job');
const BaseRepository = require('./base');

class JobRepository extends BaseRepository {
  constructor() {
    super(Job);
  }

  _getSortingParams() {
    return { startDate: 'asc' };
  }
}

module.exports = JobRepository;
