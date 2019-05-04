const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
  // user.id is not profile id.  it is the id given by mongodb.
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
      // creates req.user
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      const gmail = profile.emails[0].value;
      const name = profile.displayName;
      const googleId = profile.id;

      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId, gmail, name }).save();
      done(null, user);
    }
  )
);