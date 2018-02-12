const BaseRepository = require('./../dal/repositories/base');
const JobRepository = require('./../dal/repositories/job');

module.exports = [
  {
    name: 'baseRepository',
    instance: BaseRepository,
  }, {
    name: 'jobRepository',
    instance: JobRepository,
  },
];
