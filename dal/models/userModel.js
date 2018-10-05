class UserModel {
  constructor(id, tokens, profile) {
    this.id = id;
    this.tokens = tokens;
    this.profile = profile;
  }
}

module.exports = UserModel;