const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '178569626939-5ha7u2dr53r8nfu4ui1jemcd562sl1id.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
// passport.serializeUser(function(user, done) {
//   /*
//   From the user take just the id (to minimize the cookie size) and just pass the id of the user
//   to the done callback
//   PS: You dont have to do it like this its just usually done like this
//   */
//   done(null, user.id);
// });

// passport.deserializeUser(function(user, done) {
//   /*
//   Instead of user this function usually recives the id 
//   then you use the id to select the user from the db and pass the user obj to the done callback
//   PS: You can later access this data in any routes in: req.user
//   */
//   done(null, user.id);
// });

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile);
    return done(null, profile)
  }
));
// console.log('hello u');