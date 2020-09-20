const express = require('express');
const router = express.Router();
const Review = require("../models/Review.model");
// const App = require("../models/App.model");
const ensureLogin = require('connect-ensure-login');

//save a review to an app
//Careful! if create a new api routes, need to register it in app.js
router.post('/', ensureLogin.ensureLoggedIn(), (req, res) => {
    const appReview = req.body.value;
    const appId = req.body.appId;
    const userId = req.body.userId
    console.log(req.body)

    //to create a review model
    Review.create({
        value: appReview, 
        user: userId
    })
    .then(addedReview => {
        res.status(200).json(addedReview);
    })
    .catch(err => {
       res.json(err);
    })
    
})


module.exports = router;