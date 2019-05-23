require('mongoose');
const db = require('../models');

module.exports = app => {

  const findAndUpdate = (doc, docId, groupId) => {
    return doc.findOneAndUpdate(
      { _id: docId },
      { $push: { groups: groupId } }
    );
  }

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
  });

  app.get('/api/checkForGroup/:id', (req, res) => {
    // finds all groups of event that current user belongs to.
    const event = req.params.id || 0;
    db.Group.find({ event, users: req.user._id })
      .then(groups => {
        const response = groups.length > 0 ? true : false;
        res.send(response);
      })
  });

  
}
