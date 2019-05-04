require('mongoose');

const User = require('../models/User');

module.exports = app => {
  app.post('/api/profile', (req, res) => {
    const profile = req.body;
    const query = { googleId: req.user.googleId };

    User.findOneAndUpdate(query, { $set: profile }, { new: true }, (err, response) => {
      if (err) {console.log('profile error', err)};
      res.json(response);
    })
  })
}