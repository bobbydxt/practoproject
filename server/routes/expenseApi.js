var express = require('express');
var apirouter = express.Router();
var Expense = require("../models/expenseModel");
var helper = require("../helper/helper");
var passport = require("passport");
var validator = require("validator");




/**
 * This function is used to add a new expense
 * @param  {[string]} jwt header [contains the jwt header] 
 * @param {fields} various fields that are required in new expense
 * listed :  along the check variable below with name and type     
 * @author Bobby Dixit
 */
apirouter.post('/new', passport.authenticate('jwt', {
        session: false
    }),
    function(req, res) {
        helper.verifyToken(req.headers, function(auth) {
            if (auth.success === false) {
                return helper.sendjson(res,403,false,auth.msg);
            } else {
                
                var result = helper.validate(req.query);
                if (result.status !== true) {
                    helper.sendjson(res,400,false,result.err);
                } else {
                        result.touse["users"]=auth.user._id;
                    var new_expense = new Expense(result.touse);
                    // save the user

                    new_expense.save(function(err, expense) {
                        if (err) {
                            return helper.sendjson(res,409,false,new_expense);
                        }
                        return helper.sendjson(res,200,true, 'Successful created new Expense.',
                            {name:'id', data:expense.id});
                    });

                }
            }

        });


    });


/**
 * This function is used to put or replace a present expense
 * with a new expense
 * @param  {[string]} jwt header [contains the jwt header] 
 * @param {str} various fields that are required in new expense
 * listed :  along the check variable below with name and type     
 * @author Bobby Dixit
 */
apirouter.put('/update', passport.authenticate('jwt', {
        session: false
    }),
    function(req, res) {
        helper.verifyToken(req.headers, function(auth) {
            if (auth.success === false) {
                return helper.sendjson(res,403,false,auth.msg);
            } else {
              var result = helper.validate(req.query);
                if (result.status===false||!req.query.id) {
                    helper.sendjson(res,400,false,"You need to enter id");
                } else {

                    
                        result.touse["users"]=auth.user._id;
                    Expense.update({id: req.query.id},{$set:result.touse},
                      function(err) {
                        if(!err) 
                            helper.sendjson(res,200,true,'Successful updated new Expense.',
                            {name:'id', data:req.query.id })
                        else {
                               helper.sendjson(res,403,false,err.message);
                          } 
                    });
                }
            }

        });


    });


/**
 * This function is used to delete a new expense
 * @param  {[string]} jwt header [contains the jwt header] 
 * @param {fields} the id of the field that are required to be 
 * deleted    
 * @author Bobby Dixit
 */
apirouter.delete('/delete', passport.authenticate('jwt', {
        session: false
    }),
    function(req, res) {
        helper.verifyToken(req.headers, function(auth) {
            if (auth.success === false) {
                return helper.sendjson(res,403,false,auth.msg);
            } else {
                if (!req.query.id) {
                    helper.sendjson(res,403, false,' Id is cumpulsory for delete');
                } else {
                    Expense.remove({
                      _id: req.query.id,
                      users: auth.user._id},
                      function(error) {
                        if (error) {
                            return helper.sendjson(res,409,false,error.message);
                        }
                        return helper.sendjson(res,200,true,'Successful deleted Expense.',
                            {name:'deleted_id', data:auth.user._id });
                    });

                }
            }

        });


    });



/**
 * This function is used to get all the transactions of a perticular
 * month
 * @param  {[string]} jwt header [contains the jwt header] 
 * @param {str} various fields that are required in new expense
 * listed :  along the check variable below with name and type     
 * @author Bobby Dixit
 */
apirouter.get('/bymonth', passport.authenticate('jwt', {
        session: false
    }),
    function(req, res) {
        helper.verifyToken(req.headers, function(auth) {
            if (auth.success === false) {
                return helper.sendjson(res,403, false, auth.msg);
            } else {
                if (!req.query.month||!req.query.year||
                    !validator.isInt(req.query.month)||
                    !validator.isInt(req.query.year)) {
                   helper.sendjson(res,400,false, "You need to enter valid year and month");
                } else {

                    
                    Expense.find({users: auth.user._id,
                                  month: req.query.month,
                                  year: req.query.year},
                      function(err,expense) {
                        if (err) {
                            return helper.sendjson(res,403,false,err.message);
                        }
                        return helper.sendjson(res,200,true,'Successful searched Expense.',
                            {name:'data' ,  data:expense });
                    });
                }
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
   return helper.sendjson(res,404,false,
    'Invalid Api Request for Expense');
});






module.exports = apirouter;