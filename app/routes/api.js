var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require("../../config/database");
var passport = require("passport");
var User = require("../models/userModel")

/**
 * This is used to handle the signup user api call
 * @param  {[string]} email [email is fetched using .query]
 * @param  {[string]} password [Password is fetched using .query]              
 * @return {[bool]} [if the response was sent or error was thrown was]
 * @author Bobby Dixit
 */
router.post('/signup', function(req, res) {

 if (!req.query.email || !req.query.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    
    var newUser = new User({
      email: req.query.email,
      password: req.query.password
    });
    // save the user
   newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      return res.json({success: true, msg: 'Successful created new user.'});
    });

  }
  
});
/**
 * This is used to handle the authenticate api call
 * @param  {[string]} email [email is fetched using .query]
 * @param  {[string]} password [Password is fetched using .query]   
 * @return {[bool]} [if the response was sent or error was thrown was]
 * @author Bobby Dixit
 */
router.post('/authenticate', function(req, res) {
  User.findOne({
    email: req.query.email
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.query.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          // token expires in 10 hour
          var token = jwt.sign({ user }, config.secret,{expiresIn: '10h'});
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

/**
 * This is a dummy function to verify the jwt key
 * grant access to user
 * @param  {[string]} jwt header [contains the jwt header]       
 * @return {[bool]} [if the response was sent or error was thrown was]
 * @author Bobby Dixit
 */
router.get('/user', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.verify(token, config.secret);
    User.findOne({
      email: decoded.user.email
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false,decoded: decoded, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.email + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

/**
 * [getToken this functions returns the token]
 * @param  {[header]} headers [this is the header to be used
 *                            for authentication]
 * @return {[string]}         [token to be searched]
 * @author Bobby Dixit
 */
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};




module.exports = router;