var express = require('express');
var Metrics = require('models/metrics').Metrics;
var router = express.Router();

router.post('/openlessons', function (req, res, next)
{
	Metrics.update(req.session.user, function (metrics)
	{
		metrics.numbClicksOnLesson += 1;

		metrics.save();

		res.send({});
	});
});

module.exports = router;
