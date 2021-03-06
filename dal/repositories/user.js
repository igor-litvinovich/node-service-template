const User = require('../models/user');
const BaseRepository = require('./base');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    _getSortingParams() {
        return { _id: 'asc' };
    }
}

module.exports = UserRepository;
