var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

/**
 * [UserSchema describes the schema of the user]
 * @type {Schema}
 * @author [Bobby Dixit]
 */
var ExpenseSchema = new Schema({
  mainCatagory: {
        type: Number,
        required: true
    },
  subCatagory: {
        type: Number
    },
  amount: {
        type: Number,
        required: true
  },
  ondate: {
        type: Date,
        default: Date.now
  }
});


 

module.exports = mongoose.model('Expense', ExpenseSchema);