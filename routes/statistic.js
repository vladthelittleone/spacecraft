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
	async.waterfall(
		[
			function (callback)
			{
				if (id)
				{
					if (!Statistic.findOneAndUpdate(id, {statistic: req.body}))
					{
						var stat = new Statistic({
							idUser: id,
							statistic: req.body
						});
						stat.save(function (err, stat)
						{
							if (err)
							{
								console.error(err);
							}
						});
					}
				}
			}
		], callback);
	res.send(200);
});

module.exports = router;
