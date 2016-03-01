/**
 * @since 29.02.16
 * @author Skurishin Vladislav
 */
var express = require('express');
var router = express.Router();

var User = require('models/user').User;
var AuthError = require('error').AuthError;
var HttpError = require('error').HttpError;

router.post('/', function (req, res, next)
{
	var username = req.body.username;
	var password = req.body.password;

	User.authorize(username, password, function (err, user)
	{
		if (err)
		{
			if (err instanceof AuthError)
			{
				return next(new HttpError(403, err.message));
			}
			else
			{
				return next(err);
			}
		}

		req.session.user = user._id;
		res.send({});
	});
});

module.exports = router;
