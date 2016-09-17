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

/**
 * сначало запрос будет обработан в методе checkEmailAndPassword
 * а затем управление передей в passport
 */
router.post("/", validation.checkEmailAndPassword, passport.authenticate('local-login', {

	successRedirect: '/'

}));

router.get('/vk', passport.authenticate('vk-login'));

router.get('/vk/callback', passport.authenticate('vk-login', {

	successRedirect: '/'

}));

/**
 * проверяем авторизован ли пользователь
 */
router.get('/check', (req, res, next) => {

	console.log("FUCK " + req.isAuthenticated());

	if (!req.isAuthenticated()) {

		return next(new HttpError(401, "Вы не авторизованы"));

	}

	res.send({

		email: req.user.email

	});

});
