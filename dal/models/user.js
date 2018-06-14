const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const models = require('./models.json');

const { Schema } = mongoose;

const user = new Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId(),
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
});

user.plugin(mongoosePaginate);

module.exports = mongoose.model(models.USER, user);
