var jwt = require('jsonwebtoken');
var config = require("../config/database");
var User = require("../models/userModel");
var helper={};
/**
 * [getToken this functions returns the token]
 * @param  {[header]} headers [this is the header to be used
 *                            for authentication]
 * @return {[string]}         [token to be searched]
 * @author Bobby Dixit
 */
helper.getToken = function (headers) {
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
/**
 * @param  {object} object
 * @param  {array}  field contains names of fields to be 
 *                  checked
 * @return {Boolean} all fields are present or not
 */
helper.hasParams = function (object,field){
    var check=true;
    field.forEach( function(element, index) {
      if (object.hasOwnProperty(element==false))
      check=false;
    });
    return check;
};

helper.verifyToken = function(header,callback)
{
  var token = this.getToken(header);

  if (token) {
    var decoded = jwt.verify(token,config.secret);
    
   var user = User.findOne({
      email: decoded.user.email
    },function(err,user) {
        if (err) return  callback({success: false,status: 401,
           msg: err.message});
        if (!user) {
          return callback({success: false,status: 403,
           msg: 'Authentication failed. User not found.' });
        } else {
          return callback({success: true, 
            user: user});
        }
       
    });
   
    

  } else {
    return {success: false,status: 400,
           msg: 'No token provided' };
  }
}

module.exports = helper;
