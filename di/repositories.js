const BaseRepository = require('./../dal/repositories/base');
const UserRepository = require('./../dal/repositories/user');

module.exports = [
    {
        name: 'baseRepository',
        instance: BaseRepository,
    }, {
        name: 'userRepository',
        instance: UserRepository,
    },
];
