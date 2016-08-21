var express = require('express');
var apirouter = express.Router();
var User = require("../models/userModel");
var validator = require("validator");
var helper = require("../helper/helper");
var passport = require("passport");
var jwt = require('jsonwebtoken');
var config = require("../config/database");
/**
 * This is used to handle the signup user api call
 * @param  {[string]} email [email is fetched using .query]
 * @param  {[string]} password [Password is fetched using .query]              
 * @return {[bool]} [if the response was sent or error was thrown was]
 * @author Bobby Dixit
 */
apirouter.post('/signup', function(req, res) {

 if (!helper.hasParams(req.query,['email','password'])||
  !validator.isEmail(req.query.email)) {
    helper.sendjson(res,400,false, 
      'Please pass valid email and password.');
  } else {
    
    var newUser = new User({
      email: req.query.email,
      password: req.query.password
    });
    // save the user
   newUser.save(function(err) {
      if (err) {
        return helper.sendjsonerr(409,false, err.message);
      }
      return helper.sendjson(res,200,true, 
        'Successful created new user.');
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
apirouter.get('/authenticate', function(req, res) {
if (!helper.hasParams(req.query,['email','password'])||
  !validator.isEmail(req.query.email)) {
    helper.sendjson(res,400,false, 
     'Please pass valid email and password.');
  } else {
    //check if email exists
  User.findOne({
    email: req.query.email
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      helper.sendjson(res,400,false,
        'Authentication failed. User not found.');
    } else {
      // check if password matches
      user.comparePassword(req.query.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign({ user }, 
            config.secret);
          // return the information including token as JSON
          helper.sendjson(res,200,true, "token created successfully",
           {name:token, data: 'JWT ' + token});
        } else {
          helper.sendjson(res,403,false,
            'Authentication failed. Wrong password.');
        }
      });
    }
  });
}
});

/**
 * This is a dummy function to verify the jwt key
 * grant access to user
 * @param  {[string]} jwt header [contains the jwt header]       
 * @return {[bool]} [if the response was sent or error was thrown was]
 * @author Bobby Dixit
 */
apirouter.get('/user', passport.authenticate('jwt', { session: false}),
 function(req, res) {
  helper.verifyToken(req.headers,function(auth)
    {
       if(auth.success===false)
      {
          return helper.sendjson(res,403,false, auth.msg);
      }
      else
      {
            return helper.sendjson(res,200, true, 
              auth.user.email );
      }

});
 

});
/**
 * This function tells if the api call is not defined
 * it specifies it is invalid
 * @return {[res is sent]}      [sends success as false and 
 *                               err message associated with it]
 * @author Bobby Dixit
 */
apirouter.all('/*', function(req, res) {
   return helper.sendjson(res,404, false,
    'Invalid Api Request for User');
});






module.exports = apirouter;