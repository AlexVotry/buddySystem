const express = require('express');
const path = require('path');
const mongooose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const expTime = 30 * 24 * 60 * 60 * 1000; // 30 days
require('./models/User');
require('./services/passport');

mongooose.connect(keys.mongoURI, { useNewUrlParser: true });

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

// https://github.com/cloudinary/cloudinary_npm/blob/master/samples/basic/basic.js
// cloudinary.config({
//   cloud_name: 'aleximages',
//   api_key: keys.CLOUD_API_KEY,
//   api_secret: keys.CLOUD_API_SECRET
// });

// cloudinary.uploader.upload("my_picture.jpg", (error, result) => console.log(result));

// app.get('/', (req, res) => {
//   const example = cloudinary.url("sample.jpg", { width: 100, height: 150, crop: "fill" });
//   res.send(example);
// })

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/apiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`running on ${PORT}...`));


