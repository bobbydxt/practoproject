var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

/**
 * [UserSchema describes the schema of the user]
 * @type {Schema}
 * @author [Bobby Dixit]
 */
var UserSchema = new Schema({
  email: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
  balance: {
        type: Number,
        default: 0
  }
});

/**
 * The purpose of this function convert the plaintext 
 * string password to encrypted hashed password and store it
 * like that in the server
 * @param  {[object]} next) [as it is pointing to 
 *                          the callback function]
 * @return {[next]}       [explained above]
 * @author Bobby Dixit
 */
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt( function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
/**
 * [comparePassword This function is used to compare the
 *  password that the user provided with password of that
 *  resp user. bycrypt is used to hash the entered password 
 *  and compare the string]     
 * @param  {[string]}   passw [the password that the user has
 *                            entered]
 * @param  {Function} cb    [callback function]
 * @author Bobby Dixit
 */
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);