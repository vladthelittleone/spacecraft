/**
 * @author iretd
 * @since 09.10.16
 */

var HttpError = require('../error').HttpError;

/** Данный мидлвар осуществляет проверку аутентификации пользователя.
 */
module.exports = function (req, res, next) {

	if(!req.isAuthenticated()) {

		return res.sendStatus(401);

	}

	next();

};
