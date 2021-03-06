require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
// add for auth
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
// coockie session for log in
const MongoStore = require('connect-mongo')(session);
const User = require('./models/User.model');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/build')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// following config code **needs to be placed before the passport.initialize() function.
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      cb(err);
    } else {
      cb(null, user);
    }
  });
});

app.use(flash());
passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // incorrect username
      return next(null, false, { message: 'Wrong credentials' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      // incorrect password
      return next(null, false, { message: 'Wrong credentials' });
    }

    return next(null, user);
  });
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Routes middleware goes here
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/apps', require('./routes/app.routes'));
app.use('/api/ratings', require('./routes/rating.routes'));
app.use('/api/reviews', require('./routes/review.routes'));

// add production index.html (for deployment)
app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(`${__dirname}/client/build/index.html`);
});

module.exports = app;
