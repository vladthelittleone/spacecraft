'use strict';

/**
 * Created by vladthelittleone on 29.02.16.
 */
var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');

module.exports = router;

router.post('/', (req, res, next) => {
	
	req.logout();
	
	res.sendStatus(HttpStatus.OK);
	
});
