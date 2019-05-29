const express = require('express');
const path = require('path');
const mongooose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const expTime = 30 * 24 * 60 * 60 * 1000; // 30 days
require('./models');
require('./services/passport');

const deprecationWarningFix = {
  useCreateIndex: true,
  useNewUrlParser: true
};

mongooose.connect(keys.mongoURI, deprecationWarningFix);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: expTime,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/events')(app);
require('./routes/groups')(app);
require('./routes/users')(app);
require('./routes/map')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`running on ${PORT}...`));
