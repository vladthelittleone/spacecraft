/**
 * @author iretd
 * @since 09.10.16
 */

var HttpStatus = require('http-status-codes');

/** Данный мидлвар осуществляет проверку аутентификации пользователя.
 */
module.exports = function (req, res, next) {

	if(req.isUnauthenticated()) {

		return res.sendStatus(HttpStatus.UNAUTHORIZED);

	}

	next();

};
