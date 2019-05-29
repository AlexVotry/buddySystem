require('mongoose');
const db = require('../models');
const maps = require('../services/maps');

module.exports = app => {

  app.post('/api/profile', async (req, res) => {
    const profile = req.body;
    const query = { googleId: req.user.googleId };
    const address = await maps.geocoder(`${profile.streetAddress}+${profile.city}+${profile.state}`);
    profile.lat = address.Latitude;
    profile.long = address.Longitude;

    db.User.findOneAndUpdate(query, { $set: profile }, { new: true }, (err, response) => {
      if (err) {
        console.log('profile error', err);
        res.send('profile error');
      };
      res.json(response);
    })
  });

  app.get('/api/usernames/:id', (req, res) => {
    const groups = req.params.id;
    console.log('api groups:', groups);
    db.User.find({ groups }, (err, response) => {
      if (err) {
        console.log('Event error', err.code);
        res.json({ error: err.code });
      }
      res.json(response);
    });
  })

  app.post('/api/adduser/:id', (req, res) => {
    const groupId = req.params.id;

    db.User.findOneAndUpdate({_id: req.user._id}, { $push: { groups: groupId } }, { new: true })
    .then(user => {
      db.Group.findOneAndUpdate({_id: groupId}, { $push: { users: req.user._id } }, { new: true })
      .populate('users')
      .then(group => {
        res.json(group);
      })
    })
  });

  app.post('/api/removeuser/:id', (req, res) => {
    console.log('groupId;', req.params.id);
    const groupId = req.params.id;
    db.User.update({_id: req.user._id}, { $pull: { groups: { $in: [groupId] } } })
    .then(user => {
      db.Group.findOneAndUpdate({_id: groupId}, {$pull: { users: { $in: [req.user._id]}}}, {new: true})
      .populate('users')
      .then(group => {
        console.log('userslen:', group.users.length);
        if(group.users.length === 0) {
          db.Group.findOneAndDelete({_id: groupId})
          .then(finalGroups => {
            console.log('empty');
            res.json(finalGroups);
          });
        } else {
          res.json(group);
        }
      })
    })
  });

}
