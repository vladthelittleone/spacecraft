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

var validation = require('./../../utils/validation');

module.exports = router;

/**
 * ------------------------------------------------------------
 * АВТОРИЗАЦИЯ
 * ------------------------------------------------------------
 */
router.get('/in/vk', passport.authenticate('vk-login'));

router.get('/in/vk/callback', passport.authenticate('vk-login', {

	successRedirect: '/'

}));

router.post("/in/email", validation.checkEmailAndPassword, passport.authenticate('local-login', {

	successRedirect: '/'

}));

/**
 * ------------------------------------------------------------
 * ВЫХОД
 * ------------------------------------------------------------
 */
router.post('/out', (req, res, next) => {

	req.logout();

	res.sendStatus(HttpStatus.OK);

});

/**
 * ------------------------------------------------------------
 * РЕГИСТРАЦИЯ
 * ------------------------------------------------------------
 */
router.post('/up/email', validation.checkEmailAndPassword, passport.authenticate('local-registration', {

	successRedirect: '/'

}));
