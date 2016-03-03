/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var async = require('async');
var Statistic = require('models/statistic').Statistic;
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
					Statistic.findOneAndUpdate(id, {stat: req.body}, {upsert: true, new: true}, callback);
				}
			], function (err, doc)
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
