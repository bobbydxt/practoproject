var express = require('express');
var router = express.Router();
//var expenseApi = require('./expenseApi');
var app = express();


/**
 * This redirects all requestss to home page
 * for angular routing
 * @return {[res is successful]}      [redirects to home]
 * @author Bobby Dixit
 */

router.all('/*', function(req, res) {
    return res.render('index', {
        title: 'Home'
    });
});

module.exports = router;