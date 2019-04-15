const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  userName: String,
  image: String,
  email: String,
  phone: String,
  streetAddress: String,
  city: String,
  state: String,
  country: String,
  activities: [String],
  age: Number,
  gender: String
});

mongoose.model('users', userSchema);