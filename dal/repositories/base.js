const _ = require('lodash');
const config = require('config');
const mongoose = require('mongoose');

class BaseRepository {
  constructor(model) {
    this._model = model;
  }

  async get(query = {}) {
    const defaultPaginationParams = config.get('dbQueryDefaultParams.pagination');
    const customPaginationParams = this._getPaginationParams();
    const sort = this._getSortingParams();
    const paginationParams = Object.assign({}, defaultPaginationParams, customPaginationParams);
    const options = { sort, ...paginationParams };
    return this._model.paginate(query, options);
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const errorMessage = `${config.get('errors.INVALID_OBJECT_ID')}, id : ${id}`;
      throw Error(errorMessage);
    }
    return this._model.findOne({ _id: id });
  }

  async create(entity) {
    if (_.isEmpty(entity)) {
      throw Error(config.get('errors.CANNOT_CREATE_EMPTY_RECORD'));
    }
    return new this._model(entity).save();
  }

  async updateById(id, entity) {
    if (_.isEmpty(entity)) {
      const errorMessage = `${config.get('errors.CANNOT_UPDATE_TO_EMPTY')}, id : ${id}`;
      throw Error(errorMessage);
    }
    return this._model.findOneAndUpdate({ _id: id }, entity, { new: true });
  }

  async deleteById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const errorMessage = `${config.get('errors.INVALID_OBJECT_ID')}, id : ${id}`;
      throw Error(errorMessage);
    }
    return this._model.findOneAndRemove({ _id: id });
  }

  _getSortingParams() {
    return {};
  }

  _getPaginationParams() {
    return {};
  }
}

module.exports = BaseRepository;
