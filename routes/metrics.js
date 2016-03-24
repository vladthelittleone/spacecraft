var express = require('express');
var User = require('models/user').User;
var router = express.Router();

router.post('/opengame', function (req, res, next)
{
	var id = req.session.user;
});

router.post('/openlessons', function (req, res, next)
{
	var id = req.session.user;
});

module.exports = router;
