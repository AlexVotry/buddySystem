require('mongoose');
const db = require('../models');

module.exports = app => {

  const findAndUpdate = (doc, docId, groupId) => {
    return doc.findOneAndUpdate(
      { _id: docId },
      { $push: { groups: groupId } }
    );
  }

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

  app.get('/api/event/:id', (req, res) => {
    const id = req.params.id;

    db.Event.findById(id)
      .populate({
        path: 'groups',
        populate: {
          path: 'users',
          model: 'users'
        }
      })
      .then(dbEvent => {
        res.json(dbEvent);
      })
  })

  app.get('/api/eventsByCategory/:category', (req, res) => {
    console.log('params;', req.params.category);
    const category = req.params.category;

    db.Event.find({ category }).sort({ date: 1 }).exec((err, response) => {
      if (err) {
        console.log('Event error', err.code);
        res.json({ error: err });
      }
      res.json(response);
    })
  })


}
