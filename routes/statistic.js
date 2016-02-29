/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var router = express.Router();

router.get('/statistic', function (req, res, next)
{
	console.log('in post blabla');
	console.log(req.body.acceptDamage);
});

module.exports = router;
