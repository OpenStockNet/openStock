const express = require('express');

const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const Rating = require('../models/Rating.model');

router.get('/average/:appId', (req, res) => {
  const { appId } = req.params;

  Rating.find({ app: appId })
    .then((ratings) => {
      const sum = ratings.reduce((acc, curRating) => (acc + curRating.value), 0);
      const averageRating = Number.parseInt((sum / ratings.length).toFixed(1), 10);
      res.status(200).json(averageRating);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Page not found' });
    });
});

router.post('/', ensureLogin.ensureLoggedIn(), (req, res) => {
  const appRating = req.body.value;
  const appId = req.body.app;

  Rating.create({
    value: appRating,
    app: appId,
  })
    .then((addedRating) => {
      res.status(200).json(addedRating);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Page not found' });
    });
});

module.exports = router;
