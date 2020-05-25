const express = require('express');
const router = express.Router();
const Rating = require("../models/Rating.model");
const ensureLogin = require('connect-ensure-login');

router.get('/average/:appId', (req, res) => {
    const appId = req.params.appId; 
    
    Rating.find({app: appId})
    .then(ratings => {
        const sum = ratings.reduce((acc, curRating) =>{
            return (acc + curRating.value)
        }, 0)
        const averageRating = Number.parseInt((sum / ratings.length).toFixed(1));
            
        res.status(200).json(averageRating);
    })
    .catch(err => {
        res.json(err);
    }) 
});

router.post('/', ensureLogin.ensureLoggedIn(), (req, res) => {
    const appRating = req.body.value;
    const appId = req.body.app;
    console.log(req.body)
    Rating.create({
        value: appRating, 
        app: appId
    })
    .then(addedRating => {
        res.status(200).json(addedRating);
    })
   .catch(err => {
       res.json(err);
   })
})

module.exports = router;