const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'events' },
  ageMin: Number,
  ageMax: Number,
  gender: [String],
  max: Number,
  users: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

module.exports = mongoose.model('groups', groupSchema);