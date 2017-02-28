'use strict';

/**
 * Методы:
 * - авторизация;
 * - регистрация;
 * - выход;
 *
 * Все эти методы, связанные с доступом к сервису, были вынесены в этот отдельный
 * модуль.
 * @since 16.02.17
 * @author greezlock
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');

var HttpStatus = require('http-status-codes');

const checkAuthentication = require('./../middlewares/check-authentication');

var validation = require('./../utils/validation');

module.exports = router;

/**
 * ------------------------------------------------------------
 * АВТОРИЗАЦИЯ
 * ------------------------------------------------------------
 */
router.get('/vk', passport.authenticate('vk-login'));

router.get('/vk/callback', passport.authenticate('vk-login', {

	successRedirect: '/'

}));

router.post("/signIn", validation.checkEmailAndPassword, passport.authenticate('local-login', {

	successRedirect: '/'

}));

/**
 * ------------------------------------------------------------
 * ВЫХОД
 * ------------------------------------------------------------
 */
router.post('/signOut', checkAuthentication, (req, res, next) => {

	req.logout();

	res.sendStatus(HttpStatus.OK);

});

/**
 * ------------------------------------------------------------
 * РЕГИСТРАЦИЯ
 * ------------------------------------------------------------
 */
router.post('/signUp', validation.checkEmailAndPassword, passport.authenticate('local-registration', {

	successRedirect: '/'

}));
