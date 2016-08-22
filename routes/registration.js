/**
 * @since 02.03.16
 * @author Skurishin Vladislav
 */
var express = require('express');
var valid = require('validator');
var router = express.Router();

var User = require('models/user').User;
var AuthError = require('error').AuthError;
var HttpError = require('error').HttpError;

function isEmail(email)
{
	if (!email)
	{
		return false;
	}

	return valid.isEmail(email);
}

function isPassword(password)
{
	if (!password)
	{
		return false;
	}

	return valid.isLength(valid.trim(password), {min: 8});
}

router.post('/', function (req, res, next)
{
	var email = req.body.email;
	var password = req.body.password;
	var isSubscribeOnEmail = req.body.isSubscribeOnEmail;
		
	if (!isEmail(email))
	{
		return next(new HttpError(400, 'Некорректный email'));
	}

	if (!isPassword(password))
	{
		return next(new HttpError(400, 'Длина пароля слишком мала'));
	}

	var normalizeEmail = valid.normalizeEmail(email);

	User.registration(normalizeEmail, password, isSubscribeOnEmail, function (err, user)
	{
		if (err)
		{
			if (err instanceof AuthError)
			{
				return next(new HttpError(409, err.message));
			}
			else
			{
				return next(err);
			}
		}

		res.send({
			email: normalizeEmail
		});
	});
});

module.exports = router;
