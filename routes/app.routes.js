const express = require("express");
const router = express.Router();
const App = require("../models/App.model");
//connect-ensure-login is node pacakges installed from npm
const ensureLogin = require('connect-ensure-login');


// each of them is server endpoint
//pairing with clien>services/app.js

// fetch all apps
router.get("/", (req, res) => {
  App.find()
    .sort({ recommended: 'descending', name: 'ascending' })
    .populate("category")
    .then((apps) => {
      res.status(200).json(apps);
    })
    .catch((err) => {
      res.json(err);
    });
});

//add an app
//const "app" is sent by createApp() in frontend app.js as a request
//client sends http request to url '/api/apps' that is defined in app.js app.use('...')
//server endpoint the matching url receives this http request
//this is server endpoint receiving http request from browser services/app.js
//App.create(app) a Moongoose method saves app into data base
router.post("/", ensureLogin.ensureLoggedIn(), (req, res) => {
  const app = req.body;
  App.create(app)
    .then((createdApp) => {
      res.status(200).json(createdApp);
    })
    .catch((err) => {
      res.json(err);
    });
});

// protected page
// with React, it returns res.json(req.user)
//router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render('auth/private', { user: req.user });
// });


//delete an app
router.delete("/:id", (req, res) => {
  App.findByIdAndDelete(req.params.id)
    .then((app) => {
      res.json({ message: "App is deleted." });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
