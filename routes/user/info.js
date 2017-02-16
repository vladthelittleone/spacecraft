/**
 * @since 16.02.17
 * @author greezlock
 */

const express = require('express');
var router = express.Router();

const checkAuthentication = require('./../../middlewares/check-authentication');

var HttpStatus = require('http-status-codes');

module.exports = router;

/**
 * Возврат информации почты текущего пользователя
 */
router.get('/email', checkAuthentication, function (req, res, next) {

	res.send({
				 email: req.user.email
			 })

});

router.get('/session', function (req, res, next) {

	var status = req.isAuthenticated() ? HttpStatus.NO_CONTENT :
				 HttpStatus.UNAUTHORIZED;

	return res.sendStatus(status);

});
