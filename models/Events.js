const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  url: String,
  date: Date,
  cost: Number,
  streetAddress: String,
  city: String,
  state: String,
  neighborhood: String,
  category: [String],
  groups: [{ type: Schema.Types.ObjectId, ref: 'groups' }]
});

module.exports = mongoose.model('events', eventSchema);