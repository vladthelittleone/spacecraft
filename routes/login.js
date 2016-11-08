'use strict';

/**
 * @since 29.02.16
 * @author Skurishin Vladislav
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

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
