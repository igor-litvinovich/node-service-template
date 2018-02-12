const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const models = require('./models.json');

const { Schema } = mongoose;

const job = new Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
  },
  number: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  deadline: Date,
  jobTypeTicker: String,
  pause: {
    type: Boolean,
    default: false,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  danger: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: String,
  },
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  _projectId: {
    type: String,
  },
  _respId: {
    type: String,
  },
  _pmId: {
    type: String,
  },
  negotiation: {
    type: Boolean,
    default: false,
  },
  approval: {
    type: Boolean,
    default: false,
  },
  status: {
    phase: String,
    deletedAt: Date,
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  media: [
    {
      mimeType: String,
      url: String,
    },
  ],

});

job.plugin(mongoosePaginate);

module.exports = mongoose.model(models.JOB, job);
