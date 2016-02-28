var express = require('express');
var User = require('models/user').User;
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:id', function (req, res, next)
{
	try
	{
		var id = new ObjectID(req.params.id);
	}
	catch (e)
	{
		next(404);
		return;
	}

	User.findById(id, function (err, user)
	{
		if (err)
		{
			return next(err);
		}
		if (!user)
		{
			return next(404);
		}
		res.json(user);
	});
});

module.exports = router;
