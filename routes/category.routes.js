const express = require('express');

const router = express.Router();
const Category = require('../models/Category.model');

router.get('/', (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Page not found' });
    });
});

module.exports = router;
