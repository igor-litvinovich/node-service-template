const BaseController = require('./base');

class AuthorizationController extends BaseController {
  constructor({ authorizationService, logger }) {
    super(authorizationService, logger);
  }

  async authCallback(req, res) {
      // TODO Add mapping from reqest model to view model
      const result = await this._service.signUp(req.user);
      this.logger.info(result);
      res.status(201).send(result);
  }

  async signUp(req, res) {
    // TODO Add mapping from reqest model to view model
    const result = await this._service.signUp(req.user);
    this.logger.info(result);
    res.status(201).json(result);
  }

  async getAll(req, res) {
    const params = await this._validateParams(req.query, []);
    const result = await this._service.getAll(params);
    this.logger.info(result);
    res.status(200).json(result);
  }

  async signIn(req, res) {
    const params = await this._validateParams(req.body, ['username', 'password']);
    const result = await this._service.signIn(params);
    this.logger.info(result);
    res.status(201).json(result);
  }
}

module.exports = AuthorizationController;
