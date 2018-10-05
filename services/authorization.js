const BaseService = require('./base');

class AuthorizationService extends BaseService {
  constructor({ userRepository, bcrypt, jwt }) {
    super(userRepository);
    this._bcrypt = bcrypt;
    this._jwt = jwt;
  }

  async signUp(newUser) {
    const user = await this.findOrCreate(newUser);
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
