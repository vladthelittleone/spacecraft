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
 * Возврат информацию о текущем пользователе
 */
router.get('/', checkAuthentication, function (req, res, next) {

	res.send({
				 email: req.user.email
			 })

});

/**
 * Маршрут введен с целью упрщения восприятия общения клиентской части с серверной.
 *
 * Безусловно, понятно, что для проверки актуальности сессии, можно обратиться по любому из
 * маршрутов, которые требуют, чтобы пользователь был авторизован.
 *
 * Повторюсь. Именно для упрощения восприятия кода был введен этот отдельный маршрут, который берет
 * эту задачу на себя.
 */
router.get('/session', checkAuthentication, function (req, res, next) {

	return res.sendStatus(HttpStatus.NO_CONTENT);

});
