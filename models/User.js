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
  friends: [String]
});

module.exports = mongoose.model('users', userSchema);