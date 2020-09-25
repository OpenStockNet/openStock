const express = require('express');

const router = express.Router();
const Category = require('../models/Category.model');

router.get('/', (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
