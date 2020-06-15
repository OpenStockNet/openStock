const express = require("express");
const router = express.Router();
const App = require("../models/App.model");
const ensureLogin = require('connect-ensure-login');


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

//add an app in protected page
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


//delete an app
router.delete("/:id", (req, res) => {
  App.findByIdAndDelete(req.params.id)
    .then((app) => {
      res.json({ message: "App is deleted!" });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
