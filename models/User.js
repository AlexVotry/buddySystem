const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  gmail: String,
  userName: String,
  image: String,
  email: String,
  phone: String,
  streetAddress: String,
  city: String,
  state: String,
  lat: Number,
  long: Number,
  activities: [String],
  age: Number,
  gender: String,
  friends: [String],
  groups: [{ type: Schema.Types.ObjectId, ref: 'groups' }]
});

module.exports = mongoose.model('users', userSchema);