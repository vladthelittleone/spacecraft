/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var Statistic = require('models/statistic').Statistic;
var mongoose = require('utils/mongoose');
var router = express.Router();

router.post('/', function (req, res, next)
{
	var id = req.session.user;
	if (id)
	{
		Statistic.findeOne({idUser: id}, function (err, obj)
		{
			if (err)
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
			} else
			{
				Statistic.update(obj, {statistic: req.body}, options, callback);
			}
		});
	}
	res.send(200);
});

module.exports = router;
