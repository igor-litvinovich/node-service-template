const AuthenticationManager = require('./../helpers/authenticationManager');

module.exports = [
  {
    name: 'authenticationManager',
    instance: AuthenticationManager,
    isSingleton: true,
  },
];
