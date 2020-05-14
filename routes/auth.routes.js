const express = require('express');
const router = express.Router();
// Require user model
const User = require("../models/User.model");
// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
// Add passport
const passport = require("passport");

const ensureLogin = require('connect-ensure-login');

// signup
// remove below because the page is in express
// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  //with React, the only difference is we return .json file 
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Password must be 8 char. minimum.' });
  }
  if (!username) {
    return res.status(400).json({ message: 'Username cannot be empty.' });
  }
  
  //check if the same user name already exists
  //for React return .json file
  User.findOne({ username })
  .then(foundUser => {
    if (foundUser !== null) {
        return res
            .status(400)
            .json({ message: 'This username is already taken.' });
    }
 
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
 
    // const newUser = new User({
    //   username,
    //   password: hashPass
    // });
 
    // newUser.save((err) => {
    //   if (err) {
    //     res.render("auth/signup", { message: "Something went wrong" });
    //   } else {
    //     res.redirect("/");
    //   }
    // });
    return User.create({ username: username, password: hashPass }).then(
        dbUser => {

          req.login(dbUser, err => {
            if (err) {
              return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
            }
            res.json(dbUser);
          });
        }
      );
  })
  .catch(err => {
    res.json(err);
  })
});

// login

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });
 
// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

router.post('/login', (req, res) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error while authenticating.' });
      }
      if (!user) {
        return res.status(400).json({ message: 'Wrong credentials.' });
      }
      req.login(user, err => {
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
// with React, we add router.delete()
router.delete('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Successful logout.' });
  });

// returns the logged in user
router.get('/loggedin', (req, res) => {
    res.json(req.user);
  });

// protected page
//with React, it returns res.json(req.user)
// router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render('auth/private', { user: req.user });
// });


module.exports = router;

//with React, we add a axios.get() loggedin in index.js where rendering <BrowserRouter>
//we make the ReactDom inside the axios.get(). we need to wait for user loggin first
