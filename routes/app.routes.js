const express = require('express');
const router = express.Router();
const App = require("../models/App.model");

// fetch all apps
router.get('/', (req, res) => {
    App.find()
    .then(apps => {
        res.status(200).json(apps);
    })
    .catch(err => {
        res.json(err);
    })
});

//add an app
//const "app" is sent by createApp() in frontend app.js as a request
//client sends http request to url '/api/apps'
//server endpoint the matching url receives this http request 
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

//server endpoint to delete an app
router.delete('/:id', (req, res) => {
   
    App.findByIdAndDelete(req.params.id)
      .then(app => {
        res.json({ message: 'App is deleted.' });  
      })
      .catch(err => {
        res.json(err);
      });
  });


  
module.exports = router;

