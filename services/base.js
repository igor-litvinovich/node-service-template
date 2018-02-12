class BaseService {
  constructor(entityRepository) {
    this._repository = entityRepository;
  }

  async getAll(params) {
    const documents = await this._repository.get(params);
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
}

module.exports = BaseService;
