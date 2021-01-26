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
    .catch(() => {
      res.status(404).json({ message: 'Page not found' });
    });
});

// fetch an app
router.get('/:id', (req, res) => {
  const appId = req.params.id;
  App.findById(appId)
    .populate('category')
    .populate('creator')
    .populate('editors')
    // deep populate
    .populate({
      path: 'editors',
      populate: {
        path: 'user',
        select: 'username',
      },
    })
    .then((app) => {
      res.status(200).json(app);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      // console.log('error ---->>>>', err);
      res.status(404).json({ message: 'Page not found' });
    });
});

// add an app in protected page
router.post('/', ensureLogin.ensureLoggedIn(), (req, res) => {
  const app = req.body;
  App.create(app)
    .then((createdApp) => {
      res.status(200).json(createdApp);
    })
    .catch(() => {
      res.status(404).json({ message: 'Page not found' });
    });
});

// edit an app
router.patch('/:id', ensureLogin.ensureLoggedIn(), (req, res) => {
  const appToBeEdit = req.body;
  const editorId = req.body.editor;

  App.findByIdAndUpdate(req.params.id, appToBeEdit, { new: true })
    .then(() => App
      .findByIdAndUpdate(
        req.params.id,
        { $push: { editors: editorId } },
        { new: true },
      ))
    .then((editedApp) => {
      res.status(200).json(editedApp);
    })
    .catch(() => {
      res.status(404).json({ message: 'Page not found' });
    });
});

// delete an app
router.delete('/:id', (req, res) => {
  App.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'App is deleted!' });
    })
    .catch(() => {
      res.status(404).json({ message: 'Page not found' });
    });
});

// add app to wish list
router.post('/user/:userId', ensureLogin.ensureLoggedIn(), (req, res) => {
  const wishAppId = req.body.appId;
  const wishUserId = req.body.userId;
  // if wishUserId is null, do nothing
  App
    .findByIdAndUpdate(
      wishAppId,
      { $push: { wishUser: wishUserId } },
    )
    .then((updatedWishApp) => {
      res.status(200).json(updatedWishApp);
    })
    .catch(() => {
      res.status(404).json({ message: 'Page not found' });
    });
});

// remove app from wish list
router.patch('/user/:userId', ensureLogin.ensureLoggedIn(), (req, res) => {
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
    .catch(() => {
      res.status(404).json({ message: 'Page not found' });
    });
});

module.exports = router;
