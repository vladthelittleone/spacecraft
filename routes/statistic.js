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
					Statistic.findOne({idUser: req.session.user},callback);
				},
				function(stat, callback){
					if(stat){
						stat.stat.push(req.body);
						Statistic.findOneAndUpdate(id, {idUser: id,stat: stat.stat}, {upsert: true, new: true}, callback);
					}else{
						var newStat = new Statistic(
							{
								idUser: id,
								stat: req.body
							}
						);

						newStat.save(callback);
					}

				}
			], function (err)
			{
				if (err)
				{
					console.log("error");
				}
			});
	}
	res.send(200);
});

router.get('/', function (req, res, next)
{
	console.log(req.session.user);
	Statistic.findOne({idUser: req.session.user},(function(err, data){
		if(err){
			console.log(err);
		}
		console.log(data.stat);
		res.json(data.stat);
	}));
});

module.exports = router;
