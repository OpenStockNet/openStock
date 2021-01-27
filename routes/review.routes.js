const express = require('express');

const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const Review = require('../models/Review.model');
const App = require('../models/App.model');

// always remember if creating new api route, register it in app.js
// save a review to an app
router.post('/', ensureLogin.ensureLoggedIn(), (req, res) => {
  const appReview = req.body.value;
  const { appId } = req.body;
  const { userId } = req.body;

  Review.create({
    value: appReview,
    user: userId,
  })
    // save review id to app schema
    .then((addedReview) => App
      .findByIdAndUpdate(
        appId,
        { $push: { reviews: addedReview._id } },
      ))
    .then((app) => {
      res.status(200).json(app.reivews);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Page not found' });
    });
});

// fetch all reviews for app
router.get('/:id', (req, res) => {
  const appId = req.params.id;
  App.findById(appId)
    .populate('reviews')
  // deep populate
    .populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username',
      },
    })
    .then((app) => {
      res.status(200).json(app.reviews);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Page not found' });
    });
});

module.exports = router;
