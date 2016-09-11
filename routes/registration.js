'use strict';

/**
 * @since 02.03.16
 * @author Skurishin Vladislav
 */
var express = require('express');
var router = express.Router();

var passport = require('passport');

var validation = require('../utils/validation');

module.exports = router;

/**
 * сначало запрос будет обработан в методе #checkEmailAndPassword
 * а затем управление передаеться в passport
 */
router.post('/', validation.checkEmailAndPassword, passport.authenticate('local-registration', {

		successRedirect: '/',
		// неиспользуем так как она будет подрубленна при авторизации
		session: false

}));
