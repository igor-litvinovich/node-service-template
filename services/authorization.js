const BaseService = require('./base');
const UserModel = require('../dal/models/userModel');

class AuthorizationService extends BaseService {
  constructor({ userRepository, bcrypt, jwt, autoMapper }) {
    super(userRepository);
    this._bcrypt = bcrypt;
    this._jwt = jwt;
    this.autoMapper = autoMapper;
  }

  async signUp(newUser) {
    const user = await this.findOrCreate(newUser);
    const mappeduser = this.autoMapper.map('DataModel', UserModel, user._doc);
    return user;
  }

  async signIn(user) {
    /* if (!user) {
         throw Error('User object shouldn\'t be empty');
     }
     const createdUser = await this.create(user);
     return createdUser;*/
    return null;
  }
}

module.exports = AuthorizationService;
