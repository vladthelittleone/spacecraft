/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var router = express.Router();

router.post('/statistic', function (req, res, next)
{
	console.log('in post blabla');
	console.log(req.body.acceptDamage);
	res.send(200);
});

module.exports = router;
