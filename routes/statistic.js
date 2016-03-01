/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next)
{
	if(req.session.user){

	}
	res.send(200);
});

module.exports = router;
