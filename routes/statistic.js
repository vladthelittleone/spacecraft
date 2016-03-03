/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var async = require('async');
var Statistic = require('models/statistic').Statistic;
var mongoose = require('utils/mongoose');
var router = express.Router();

router.post('/', function (req, res, next)
{
	var id = req.session.user;
	if (id)
	{
		async.waterfall(
			[
				function (callback)
				{
					Statistic.findOneAndUpdate(id, {statistic: req.body}, {upsert: true}, callback);
				}
			], function (err, result)
			{
				if (err)
				{
					console.log("error");
				}
			});
	}

	res.send(200);
});

module.exports = router;
