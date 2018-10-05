const container = require('../../di');
const UserModel = require('../../dal/models/userModel');

const autoMapper = container.resolve('autoMapper');

autoMapper.createMap('DataModel', UserModel)
  .forAllMembers(autoMapper.copyOwnProperties)
  .forMember('id', (opts) => opts.sourceObject._id);

/*autoMapper.createMap(SpaceImagesModel, 'SpaceImagesStateModel')
  .forAllMembers(autoMapper.copyDefinedProperties);*/