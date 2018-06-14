const BaseService = require('./base');

class AuthorizationService extends BaseService {
    constructor({userRepository, bcrypt, jwt}) {
        super(userRepository);
        this._bcrypt = bcrypt;
        this._jwt = jwt;
    }

    async signUp(user) {
        if (!user) {
            throw Error('User object shouldn\'t be empty');
        }

        const hash = this._bcrypt.hashSync(user.password, 10);
        const userObject = Object.assign({}, user, { password: hash });
        const createdUser = await this.create(userObject);
        const plainUser = createdUser.toJSON();
        const token = this._jwt.sign(plainUser, '111222');
        const decoded = this._jwt.verify(token, '111222');
        return token;
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
