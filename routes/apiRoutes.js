require('mongoose');
const db = require('../models');

module.exports = app => {

  const findAndUpdate = (doc, docId, groupId) => {
    return doc.findOneAndUpdate(
      { _id: docId },
      { $push: { groups: groupId } }
    );
  }
  app.post('/api/profile', (req, res) => {
    const profile = req.body;
    const query = { googleId: req.user.googleId };

    db.User.findOneAndUpdate(query, { $set: profile }, { new: true }, (err, response) => {
      if (err) {
        console.log('profile error', err);
        res.send('profile error');
      };
      res.json(response);
    })
  });

  app.post('/api/event', (req, res) => {
    const event = req.body;
    console.log('event:', event);

    db.Event.create(event, (err, response) => {
      if (err) {
        console.log('Event error', err.code);
        res.json({error: err.code});
      } 
      res.json(response);
    })
  });

  app.post('/api/group/:id', (req, res) => {
    const group = req.body;
    const userId = req.params.id;
    let apiGroup = {};

    db.Group.create(group)
      .then(dbGroup => {
        apiGroup = dbGroup;
        return findAndUpdate(db.Event, dbGroup.event, dbGroup._id);
      })
      .then(() => {
        return findAndUpdate(db.User, userId, apiGroup._id);
      })
      .then(() => {
        res.json(apiGroup);
      })
      .catch(err => {
        res.json(err);
      });
    })

  app.get('/api/event/:id', (req, res) => {
    const id = req.params.id;

    db.Event.findById(id)
      .populate('groups')
      .then(dbEvent => {
        res.json(dbEvent);
      })
  })

  app.get('/api/usernames/:id', (req, res) => {
    const groups = req.params.id;
    db.User.find({ groups }, (err, response) => {
      if (err) {
        console.log('Event error', err.code);
        res.json({ error: err.code });
      }
      res.json(response);
    });

  })
  app.get('/api/checkForGroup/:id', (req, res) => {
    const event = req.params.id;
    db.Group.find({ event, users: req.user._id })
      .then(groups => {
        const response = groups.length > 0 ? true : false;
        res.send(response);
      })
  })
}