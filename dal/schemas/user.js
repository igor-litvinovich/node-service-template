const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const models = require('./models.json');

const { Schema } = mongoose;

const user = new Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId()
  },
  tokens: {
    accessToken: {
      type: String
    },
    refreshToken: {
      type: String
    }
  },
  profile: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    displayName: {
      type: String
    },
    profileId: {
      type: String
    },
    photoUrl: {
      type: String
    },
    provider: {
      type: String
    }
  }
});

user.plugin(mongoosePaginate);
module.exports = mongoose.model(models.USER, user);
