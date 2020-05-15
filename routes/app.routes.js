const express = require('express');
const router = express.Router();
const App = require("../models/App.model");
//const Category = require("../models/Category.model");
//const User = require("../models/User.model");
//const ensureLogin = require('connect-ensure-login');

router.get('/', (req, res) => {
    
    App.find()
    .then(apps => {
        res.status(200).json(apps);
    })
    .catch(err => {
        res.json(err);
    })

});

//add a new app
//const "app" is sent by createApp in frontend app.js as a request
router.post('/', (req, res) => {
    const app = req.body
    App.create(app)
    .then(createdApp => {
        res.status(200).json(createdApp);
    })
   .catch(err => {
       res.json(err);
   })
})
module.exports = router;