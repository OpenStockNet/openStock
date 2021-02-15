const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const bcryptSalt = 10;
const passport = require('passport');

const User = require('../models/User.model');

// signup
router.post('/signup', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  if (!password || password.length < 8) {
    res
      .status(400)
      .json({ message: 'Password must be 8 char. minimum!' });
    return;
  }
  if (!username) {
    res.status(400).json({ message: 'Username cannot be empty.' });
    return;
  }

  User.findOne({ username })
    .then((foundUser) => {
      if (foundUser !== null) {
        return res
          .status(400)
          .json({ message: 'This username is already taken!' });
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      return User.create({ username, password: hashPass }).then(
        (dbUser) => {
          // after sign up, the user is automatically logged-in
          req.login(dbUser, (err) => {
            if (err) {
              res
                .status(500)
                .json({ message: 'Error while attempting to login.' });
            } else {
              res.json(dbUser);
            }
          });
        },
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: 'Page not found' });
    });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Error while authenticating.' });
      return;
    }
    if (!user) {
      res.status(400).json({ message: 'Wrong username and/or password!' });
      return;
    }
    req.login(user, () => {
      if (err) {
        res
          .status(500)
          .json({ message: 'Error while attempting to login.' });
      } else {
        res.json(user);// response.data, extracted in index.js
      }
    });
  })(req, res);
});

// logout
router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout.' });
});

// returns the logged in user
router.get('/loggedin', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User is not authorised.' });
  }
  return res.json(req.user);
});

module.exports = router;
