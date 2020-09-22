const express = require('express');
const router = express.Router();
const Review = require("../models/Review.model");
const App = require("../models/App.model");
const ensureLogin = require('connect-ensure-login');

//save a review to an app
//Careful! if create a new api routes, need to register it in app.js
router.post('/', ensureLogin.ensureLoggedIn(), (req, res) => {
    const appReview = req.body.value;
    const appId = req.body.appId;
    const userId = req.body.userId

    Review.create({
        value: appReview, 
        user: userId
    })
    //save review id to app schema
      .then(addedReview => {
          return App
          .findByIdAndUpdate(
          appId,
          { $push: { reviews: addedReview._id}},
          )
      })
      .then((app) => {
        res.status(200).json(app.reivews);
      })
      .catch(err => {
        res.json(err);
      })
})

//fetch all reviews for app
router.get("/:id", (req, res) => {
    const appId = req.params.id;
    App.findById(appId)
      .populate("reviews")
      //deep populate
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'username',
        }
      })
      .then((app) => {
        res.status(200).json(app.reviews);
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = router;