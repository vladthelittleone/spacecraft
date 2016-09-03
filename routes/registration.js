/**
 * @since 02.03.16
 * @author Skurishin Vladislav
 */
var express = require('express');
var router = express.Router();

var passport = require('passport');

var authHelp = require('../utils/passport/auth');

// сначало запрос будет обработан в методе checkEmailAndPassword
// а затем управление передей в passport
router.post('/', authHelp.checkEmailAndPassword, passport.authenticate('local-registration', {

		successRedirect: '/',
		session: false

}));

module.exports = router;
