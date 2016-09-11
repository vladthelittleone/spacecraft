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

// GET /auth/vk
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in VK authentication will involve
//   redirecting the user to vk.com.  After authorization, VK will
//   redirect the user back to this application at /auth/vk/callback
router.get('/vk',
		passport.authenticate('vk-login'),
		(req, res) => {
			// The request will be redirected to VK for authentication, so this
			// function will not be called.
		});

// GET /auth/vk/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/vk/callback', passport.authenticate('vk-login', { successRedirect: '/' }));

/**
 * проверяем авторизован ли пользователь
 */
router.get('/check', (req, res, next) => {

	if (!req.isAuthenticated()) {

		return next(new HttpError(401, "Вы не авторизованы"));

	}

	res.send({

		email: req.user.email

	});

});
