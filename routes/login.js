/**
 * @since 29.02.16
 * @author Skurishin Vladislav
 */
var express = require('express');
var router = express.Router();

var User = require('models/user').User;
var AuthError = require('error').AuthError;
var HttpError = require('error').HttpError;

function isBlank()
{
	var isBlank = false;

	var args = Array.prototype.slice.call(arguments, 0);

	args.forEach(function (v)
	{
		if (!v || !v.trim())
		{
			isBlank = true;
		}
	});

	return isBlank;
}
router.post('/', function (req, res, next)
{
	var username = req.body.username;
	var password = req.body.password;

	if (isBlank(username, password))
	{
		return next(new HttpError(400, 'Некорректный пароль или email'));
	}

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

router.get('/check', function (req, res, next)
{
	if (!req.session.user)
	{
		return next(new HttpError(401, "Вы не авторизованы"));
	}

	res.send({});
});

module.exports = router;
