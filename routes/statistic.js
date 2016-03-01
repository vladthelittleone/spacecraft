/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var User = require('models/user').User;
var Statistic = require('models/statistic').Statistic;
var mongoose = require('utils/mongoose');
var router = express.Router();

router.post('/', function (req, res, next)
{
	if(req.session.user){
		var user = User.findById(req.session.user);
		var stat = new Movie({
			username: user.username,
			statistic: req.body
		});
		stat.save(function(err, stat){
			if(err)
				console.error(err);
		});
	}
	res.send(200);
});

module.exports = router;
