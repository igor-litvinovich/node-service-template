const _ = require('lodash');

class BaseService {
  constructor(entityRepository) {
    this._repository = entityRepository;
  }

  async getAll(params) {
    const paginationOptions = _.pick(params, ['limit', 'offset', 'page']);
    const queryParams = _.omit(params, Object.keys(paginationOptions));
    const mappedPaginationParams = _.mapValues(paginationOptions, (option) => {
       const num = Number(option);
       if (Number.isNaN(num)) {
           return option;
       }
       return num;
    });
    const documents = await this._repository.get(queryParams, mappedPaginationParams);
    return documents;
  }

  async getById(id) {
    const document = await this._repository.getById(id);
    return document;
  }

  async create(entity) {
    const document = await this._repository.create(entity);
    return document;
  }

  async update(id, entity) {
    const documents = await this._repository.updateById(id, entity);
    return documents;
  }

  async delete(id) {
    const documents = await this._repository.deleteById(id);
    return documents;
  }

  async findOrCreate(newEntity) {
    const entiry = await this.model.findOne(newEntity);
    if (entiry) {
      return entiry;
    }
    const document = await this.create(newEntity);
    return document;
  }

  get model() {
    return this._repository._model;
  }
}

module.exports = BaseService;
