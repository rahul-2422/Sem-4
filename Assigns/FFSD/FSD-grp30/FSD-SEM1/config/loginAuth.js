const LocalStrategy = require('passport-local').Strategy;
require('../src/db/conn')
const mongoose = require('mongoose')
const User = require('../src/models/users')

module.exports = function(passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, async(email, password, done) => {
        try {
          const user = await User.findOne({email:email})
          if(!user)return done(null, false);
          if(user.password !== password)return done(null, false);
          return done(null, user)
        } catch (error) {
          console.log(error);
        }
      })
    );
  
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
  
    passport.deserializeUser(async(id, done)=> {
      try {
        const user = await User.findById(id)
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    });
  };

module.exports.isAuthenticated = (req, res, next) => {
    if(req.user)return next()
    res.redirect('/login')
}