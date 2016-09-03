var jwt = require('jsonwebtoken');
var config = require("../config/database");
var User = require("../models/userModel");
var helper = {};
var validator = require("validator");
/**
 * [getToken this functions returns the token]
 * @param  {[header]} headers [this is the header to be used
 *                            for authentication]
 * @return {[string]}         [token to be searched]
 * @author Bobby Dixit
 */
helper.getToken = function(headers) {
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
helper.validEmailPass = function(data, res) {
    if (!data.email || !data.password || !validator.isEmail(data.email)) {
        this.sendjson(res, 400, false,
            'Please pass valid email and password.');
        return false;
    } else
        return true;
};
/**
 * This function is used to generate jwt token
 * @param  {object} object that provides email and password
 * @param  {[object]} res  triggers http response
 * @author [Bobby Dixit]
 */
helper.tokenGenerator = function(object, res) {
    User.findOne({
        email: object.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            helper.sendjson(res, 400, false,
                'Authentication failed. User not found.');
        } else {
            // check if password matches
            user.comparePassword(object.password, function(err, isMatch) {
                if (isMatch && !err) {

                    // if user is found and password is right create a token
                    var token = jwt.sign({
                        email: user.email
                    }, config.secret);
                    var decoded = jwt.verify(token, config.secret);
                    // return the information including token as JSON
                    helper.sendjson(res, 200, true, "token created successfully", {
                        email: user.email,
                        data: decoded,
                        token: 'JWT ' + token
                    });
                } else {
                    helper.sendjson(res, 403, false,
                        'Authentication failed. Wrong password.');
                }
            });
        }
    });
}

/**
 * this functions checks if jwt is valid or not 
 * @param  {header} the header that contains jwt
 * @param  {callback}
 * @return {user} returns user object if it is valid
 * @author [Bobby Dixit]
 */
helper.verifyToken = function(header, callback) {
    var token = this.getToken(header);

    if (token) {
        var decoded = jwt.verify(token, config.secret);

        var user = User.findOne({
            email: decoded.email
        }, function(err, user) {
            if (err) return callback({
                success: false,
                status: 403,
                msg: err.message
            });
            if (!user) {
                return callback({
                    success: false,
                    status: 403,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                return callback({
                    success: true,
                    user: user
                });
            }
        });
    } else {
        return callback({
            success: false,
            status: 400,
            msg: 'No token provided'
        });
    }
}

/**
 * This is used to reduce the clycometric complexity of validate function
 * @param  {bool} validation sends in the validation result
 * @param  {string} name keeps in the name of the field 
 * @param  {object} data contains the data
 * @param  {toreturn} contains the array of valid datas
 * @param {[err]} contains the array of errors occoured
 * @return {array} containing toreturn array and error array
 * @author [Bobby Dixit]
 */
helper.subvalidator = function(validation, name, data, toreturn, err) {
    if (!validation)
        err.push("You value for " + name + "is invalid");
    else
        toreturn[name] = data;
    return {
        toreturn: toreturn,
        err: err
    };

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
helper.validate = function(object, extra) {
    var present = this;
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
    var err = [];
    field.forEach(function(element, index) {
        if (!object.hasOwnProperty(element.property) &&
            element.type === "cumpulsory") {
            err.push("You need to have: " + element.property);
        } else if (object.hasOwnProperty(element.property)) {
            var validation, temp;
            var switcher = {
                'expenseType': validator.isInt(object[element.property], {
                    min: 1,
                    max: 2
                }),
                'mainCatagory': validator.isInt(object[element.property], {
                    min: 0,
                    max: 10
                }),
                'subCatagory': validator.isInt(object[element.property], {
                    min: 0,
                    max: 10
                }),
                'amount': validator.isDecimal(object[element.property]),
                'ondate': validator.isDate(object[element.property]),
                'remark': true
            };
            validation = switcher[element.property];
            temp = present.subvalidator(validation, element.property, object[element.property], toreturn, err);
            err = temp.err;
            toreturn = temp.toreturn;

        }
    });
    if (err.length === 0)
        return {
            status: true,
            touse: toreturn
        };
    else
        return {
            status: false,
            err: err
        };
}


/**
 * used to generate http response
 * @param  {object} res res express object
 * @param  {number} status numeric http status
 * @param  {bool} status sends if request wsa
 * @param  {string} message  message of the request 
 * @param  {object} extra  if any extra info is to be sent 
 * @return {bool} if operation was successful or not
 */
helper.sendjson = function(res, status, success, message, extra) {

    if (extra) {
        return res.status(status).send({
            success: success,
            msg: message,
            data: extra
        });
    } else
        return res.status(status).send({
            success: success,
            msg: message
        });
}


module.exports = helper;