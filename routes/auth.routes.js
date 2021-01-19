const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

const bcryptSalt = 10;
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

// signup
router.post('/signup', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  // console.log(username);

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Password must be 8 char. minimum!' }); 
  }
  if (!username) {
    return res.status(400).json({ message: 'Username cannot be empty.' });
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
              return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
            }
            res.json(dbUser);
          });
        },
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating.' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong username and/or password!' }); 
    }
    req.login(user, () => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Error while attempting to login.' });
      }
      return res.json(user);
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
  res.json(req.user);
});

module.exports = router;
