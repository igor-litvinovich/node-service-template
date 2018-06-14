const BaseController = require('./base');

class AuthorizationController extends BaseController {
  constructor({ authorizationService, logger }) {
    super(authorizationService, logger);
  }

  async signUp(req, res) {
    const params = await this._validateParams(req.body, ['username', 'password']);
    const result = await this._service.signUp(params);
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
