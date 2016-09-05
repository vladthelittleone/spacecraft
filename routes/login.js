'use strict';

/**
 * @since 29.02.16
 * @author Skurishin Vladislav
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

var HttpError = require('error').HttpError;

var validation = require('../utils/validation');

module.exports = router;

// сначало запрос будет обработан в методе checkEmailAndPassword
// а затем управление передей в passport
router.post("/", validation.checkEmailAndPassword, passport.authenticate('local-login', {

	successRedirect: '/'

}));

// проверяем авторизован ли пользователь
router.get('/check', function (req, res, next) {

	if (!req.isAuthenticated()) {

		return next(new HttpError(401, "Вы не авторизованы"));

	}

	res.send({

		email: req.user.email

	});

});
