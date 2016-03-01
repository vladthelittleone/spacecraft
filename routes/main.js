/**
 * Created by vladthelittleone on 29.02.16.
 */
var express = require('express');
var router = express.Router();
var check = require('middlewares/checkAuth');

router.get('/', check, function (req, res, next)
{

});

module.exports = router;
