const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const models = require('./models.json');

const { Schema } = mongoose;

const user = new Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId(),
    },
    accessToken: {
        type: String,
    },
    profile: {
      type: Object,
    },
});

user.plugin(mongoosePaginate);
module.exports = mongoose.model(models.USER, user);
