const express = require('express');
const router = express.Router();
const Rating = require("../models/Rating.model");
const ensureLogin = require('connect-ensure-login');

//find all Ratings that has the specific app id
//add up value and divided by number of Ratings
//goal: calcuate average rating of an app

//get url shall pair with clien>services/rating.js!!!

// find() is mongoose method; req.query._id is Express 
// check the server endpoints with insomnia
// result of find() is array of ratings
router.get('/average/:appId', (req, res) => {
    const appId = req.params.appId; //appId named by us
    
    Rating.find({app: appId})
    .then(ratings => {
        const sum = ratings.reduce((acc, curRating) =>{
            return (acc + curRating.value)
        }, 0)
        // let sum = 0;
        // for (let i = 0; i < ratings.length; i ++) {
        //     sum = sum + ratings[i].value
        // }
        const averageRating = Number.parseInt((sum / ratings.length).toFixed(1));
            
        res.status(200).json(averageRating);
    })
    .catch(err => {
        res.json(err);
    }) 
});

//add endpoint router.post to accept HTTP request from rating.js
//this endpoint passes value data to DB: Rating.create() does it
//make sure object key matches DB schema key
router.post('/', ensureLogin.ensureLoggedIn(), (req, res) => {
    const appRating = req.body.value;
    const appId = req.body.app;
    console.log(req.body)
    Rating.create({
        value: appRating, 
        app: appId
    })
    //addedRating is reuslt of create method = "value: appRating, app:appId"
    .then(addedRating => {
        res.status(200).json(addedRating);
    })
   .catch(err => {
       res.json(err);
   })
})

module.exports = router;