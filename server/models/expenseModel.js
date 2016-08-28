var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * [UserSchema describes the schema of the Expense Model]
 * @type {Schema}
 * @author [Bobby Dixit]
 */
var ExpenseSchema = new Schema({
  expenseType:  {
        type: Number,
        required: true
  },
  mainCatagory: {
        type: Number,
        default: 0
    },
  subCatagory: {
        type: Number,
        default: 0
    },
  amount: {
        type: Number,
        required: true
  },
  ondate: {
        type: Date,
        default: Date.now
  },
  month: {
        type: Number
  },
  year: {
        type: Number
  },
  users: [{
       type: Schema.Types.ObjectId,
        ref: 'User'
  }],
  remark: [{
        type: String,
        default: ''
  }]
});
/**
 * this function adds month and year field directly to db to make
 * querying faster
 * @param  {next}  callback i.e. next operation in saving
 * @return {next}
 * @author [Bobby Dixit]
 */
ExpenseSchema.pre('save', function (next) {
    var expense = this;
    if (this.isModified('date') || this.isNew) {
        var date =  new Date(expense.ondate);
        expense.month = date.getMonth()+1;
        expense.year = date.getFullYear();
        return next();
    } else {
        return next();
    }
});
 

module.exports = mongoose.model('Expense', ExpenseSchema);