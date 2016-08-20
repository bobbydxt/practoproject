var jwt = require('jsonwebtoken');
var config = require("../config/database");
var User = require("../models/userModel");
var helper={};
var validator = require("validator");
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
      if (!object.hasOwnProperty(element))
      check=false;
    });
    return check;
};

/**
 * this functions checks if jwt is valid or not 
 * @param  {header} the header that contains jwt
 * @param  {callback}
 * @return {user} returns user object if it is valid
 * @author [Bobby Dixit]
 */
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
/**
 * checks if expense fields are valid or not
 * @param  {object} object over which validation is to be done
 * @param  {extra}  if any extra fields needs to be validated
 * @return {object} status and data, 
 *                status: true/false
 *                data: fields that needs to used in db (exckudes
 *                unwanted/empty fields) / error resp.
 * @author [Bobby Dixit]
 */
helper.validate = function(object,extra)
{
  var field = [{
                    property: 'expenseType',
                    type: 'cumpulsory'
                }, {
                    property: 'mainCatagory',
                    type: 'optional'
                }, {
                    property: 'subCatagory',
                    type: 'optional'
                }, {
                    property: 'amount',
                    type: 'cumpulsory'
                }, {
                    property: 'ondate',
                    type: 'optional'
                }];
  var toreturn = {};
  var err=[];
  field.forEach( function(element, index) {
     if (!object.hasOwnProperty(element.property)&&
      element.type=="cumpulsory")
     {
      err.push("You need to have: " + element.property);
    }
    else if (object.hasOwnProperty(element.property)) {

      switch(element.property){
        case 'expenseType': 
            if(!validator.isInt(object[element.property],{min: 1, max: 5}))
              err.push("You value for "+ element.property+ "is invalid");
            else
              toreturn[element.property]= object[element.property];
            break;
        case 'mainCatagory': 
            if(!validator.isInt(object[element.property],{min: 1, max: 10}))
              err.push("You value for "+ element.property+ "is invalid");
            else
              toreturn[element.property]= object[element.property];
            break;
        case 'subCatagory': 
            if(!validator.isInt(object[element.property],{min: 1, max: 10}))
              err.push("You value for "+ element.property+ "is invalid");
            else
              toreturn[element.property]= object[element.property];
            break;
        case 'amount': 
            if(!validator.isDecimal(object[element.property],{min: 1, max: 5}))
              err.push("You value for "+ element.property+ "is invalid");
            else
              toreturn[element.property]= object[element.property];
            break;
        case 'ondate': 
            if(!validator.isDate(object[element.property],{min: 1, max: 5}))
              err.push("You value for "+ element.property+ "is invalid");
            else
              toreturn[element.property]= object[element.property];
            break;

      }
    
    }
  });
  if(err.length==0)
    return {status: true,touse: toreturn};
  else 
    return {status: false,err: err};
}

module.exports = helper;
