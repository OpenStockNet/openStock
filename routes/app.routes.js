const express = require('express');

const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const App = require('../models/App.model');

// fetch all apps
router.get('/', (req, res) => {
  App.find()
    .sort({ recommended: 'descending', name: 'ascending' })
    .populate('category')
    .then((apps) => {
      res.status(200).json(apps);
    })
    .catch((err) => {
      res.json(err);
    });
});

// fetch an app
router.get('/:id', (req, res) => {
  const appId = req.params.id;
  App.findById(appId)
    .populate('category')
    .then((app) => {
      res.status(200).json(app);
    })
    .catch((err) => {
      res.json(err);
    });
});

// add an app in protected page
router.post('/', ensureLogin.ensureLoggedIn(), (req, res) => {
  const app = req.body;
  App.create(app)
    .then((createdApp) => {
      res.status(200).json(createdApp);
    })
    .catch((err) => {
      res.json(err);
    });
});

// edit an app
router.patch('/:id', (req, res) => {
  // appToBeEdit in editApp is sent as req.body in app.js
  const appToBeEdit = req.body;
  App.findByIdAndUpdate(req.params.id, appToBeEdit, { new: true })
    .then((editedApp) => {
      // eslint-disable-next-line no-console
      // console.log('request from client', req.body);
      // eslint-disable-next-line no-console
      // console.log('response to client', editedApp);
      res.status(200).json(editedApp);
    })
    .catch((err) => {
      res.json(err);
    });
});

// delete an app
router.delete('/:id', (req, res) => {
  App.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: 'App is deleted!' });
    })
    .catch((err) => {
      res.json(err);
    });
});

// add app to wish list
router.post('/user/:userId', (req, res) => {
  const wishAppId = req.body.appId;
  const wishUserId = req.body.userId;

  App
    .findByIdAndUpdate(
      wishAppId,
      { $push: { wishUser: wishUserId } },
    )
    .then((updatedWishApp) => {
      res.status(200).json(updatedWishApp);
    })
    .catch((err) => {
      res.json(err);
    });
});

// remove app from wish list
router.patch('/user/:userId', (req, res) => {
  const wishAppId = req.body.appId;
  const wishUserId = req.body.userId;

  App
    .findByIdAndUpdate(
      wishAppId,
      { $pull: { wishUser: wishUserId } },
    )
    .then(() => {
      res.json({ message: 'App is removed!' });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
