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

 if (helper.validEmailPass(req.query,res)){
    
    var newUser = new User({
      email: req.query.email,
      password: req.query.password
    });
    // save the user
   newUser.save(function(err) {
      if (err) {
        return helper.sendjson(res,409,false, err.message);
      }
      else
      {

      return helper.tokenGenerator(req.query,res);
    }
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
 if (helper.validEmailPass(req.query,res)){
    //check if email exists
  helper.tokenGenerator(req.query,res);
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
          return helper.sendjson(res,auth.status,false, auth.msg);
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