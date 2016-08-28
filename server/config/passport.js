var JwtStrategy = require('passport-jwt').Strategy;
 
// load up the user model
var User = require('../models/userModel');
var config = require('./database'); // get db config file
/**
 * [exports configures the passport package
 *  associates the jwt stratergy]
 * @author Bobby Dixit
 */
module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};