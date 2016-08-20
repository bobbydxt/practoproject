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
            if (auth.success == false) {
                return res.send({
                    success: false,
                    msg: auth.msg
                });
            } else {
                
                var result = helper.validate(req.query);
                if (result.status != true) {
                    res.status(400).send({
                        success: false,
                        msg: result.err
                    });
                } else {
                        result.touse["users"]=auth.user._id;
                    var new_expense = new Expense(result.touse);
                    // save the user

                    new_expense.save(function(err, expense) {
                        if (err) {
                            return res.status(409).send({
                                success: false,
                                msg: err.message,data: new_expense
                            });
                        }
                        return res.status(200).send({
                            success: true,
                            msg: 'Successful created new Expense.',
                            id: expense.id
                        });
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
            if (auth.success == false) {
                return res.send({
                    success: false,
                    msg: auth.msg
                });
            } else {
              var result = helper.validate(req.query);
                if (result.status==false||!req.query.id) {
                    res.status(400).send({
                        success: false,
                        msg: "You need to enter id"
                    });
                } else {

                    
                        result.touse["users"]=auth.user._id;
                    Expense.update({id: req.query.id},{$set:result.touse},
                      function(err) {
                        if (err) {
                            return res.status(403).send({
                                success: false,
                                msg: err.message
                            });
                        }
                        return res.status(200).send({
                            success: true,
                            msg: 'Successful updated new Expense.',
                            id: req.query.id
                        });
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
            if (auth.success == false) {
                return res.send({
                    success: false,
                    msg: auth.msg
                });
            } else {
                if (!req.query.id) {
                    res.status(400).send({
                        success: false,
                        msg: ' Id is cumpulsory for delete'
                    });
                } else {
                    Expense.remove({
                      _id: req.query.id,
                      users: auth.user._id},
                      function(err) {
                        if (err) {
                            return res.status(409).send({
                                success: false,
                                msg: err.message,data: new_expense
                            });
                        }
                        return res.status(200).send({
                            success: true,
                            msg: 'Successful deleted Expense.',
                            id: auth.user._id
                        });
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
            if (auth.success == false) {
                return res.send({
                    success: false,
                    msg: auth.msg
                });
            } else {
                if (!req.query.month||!req.query.year||
                    !validator.isInt(req.query.month)||
                    !validator.isInt(req.query.year)) {
                    res.status(400).send({
                        success: false,
                        msg: "You need to enter valid year and month"
                    });
                } else {

                    
                    Expense.find({users: auth.user._id,
                                  month: req.query.month,
                                  year: req.query.year},
                      function(err,expense) {
                        if (err) {
                            return res.status(403).send({
                                success: false,
                                msg: err.message
                            });
                        }
                        return res.status(200).send({
                            success: true,
                            msg: 'Successful updated new Expense.',
                            data: expense
                        });
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
   return res.status(404).send({success: false
 , msg: 'Invalid Api Request for Expense'});
});






module.exports = apirouter;