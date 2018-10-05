const AuthenticationManager = require('./../helpers/authenticationManager');
const AutoMapper = require('./../helpers/automapper');

module.exports = [
  {
    name: 'authenticationManager',
    instance: AuthenticationManager,
    isSingleton: true,
  },
  {
    name: 'autoMapper',
    instance: AutoMapper,
    isSingleton: true,
  },
];
