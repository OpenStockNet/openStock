const express = require('express');
const router = express.Router();
const Rating = require("../models/Rating.model");

//find all Ratings that has the specific app id
//add up value and divided by number of Ratings
//goal: calcuate average rating of an app

//pairing with clien>services/rating.js

// fetch all apps server endpoint
// find() is mongoose method; req.query._id is Express 
// check the server endpoints with insomnia
// result of find() is array of ratings
router.get('/average/:appId', (req, res) => {
    const appId = req.params.appId; //appId named by us
    
    Rating.find({app: appId})
    .then(ratings => {
        const sum = ratings.reduce((acc, curRating) =>{
            return (acc + curRating.value)
        })
        // let sum = 0;
        // for (let i = 0; i < ratings.length; i ++) {
        //     sum = sum + ratings[i].value
        // }
        const averageRating = sum / ratings.length
            
        res.status(200).json(averageRating);
    })
    .catch(err => {
        res.json(err);
    }) 
});

module.exports = router;