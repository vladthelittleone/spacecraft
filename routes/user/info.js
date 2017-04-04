/**
 * @since 16.02.17
 * @author greezlock
 */

const express = require('express');

var router = express.Router();

var lodash = require('lodash');

var webMailLinker = require('webmail-linker');

const checkAuthentication = require('./../../middlewares/check-authentication');

var HttpStatus = require('http-status-codes');

var EmailConfirmationModel = require('./../../models/email.confirmation');

var validator = require('validator');

const logger = require('./../../utils/log')(module);

module.exports = router;

/**
 * Возврат информацию о текущем пользователе
 */
router.get('/user/info', checkAuthentication, function (req, res, next) {

	let user = req.user;

	let response = {};

	// если пользователь еще не подтверждал почту.
	if (!lodash.isNil(user.emailConfirmationFlag) && user.emailConfirmationFlag === false) {

		response.needToConfirmEmail = true;
		response.email = user.email;
		
		let emailProvider = webMailLinker.getProviderByEmailAddress(user.email);
		response.emailProviderUrl = emailProvider && emailProvider.url;

	}

	response.name = user.name;

	res.send(response);

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
router.get('/user/info/session', checkAuthentication, function (req, res, next) {

	return res.sendStatus(HttpStatus.NO_CONTENT);

});

/**
 * Обработка запроса на подтверждение почты.
 * Логика обработки сводится к последующим действиям:
 * 1) Проверка параметра запроса confirmationKey на корректность;
 * 2) Если параметр корректный, пытаемся зафиксировать подтверждение почты;
 * 3) Перенаправляем пользователя в корень сайта.
 * Стоит заметить, что если параметр (confirmationKey) прошел валидацию,
 * то редирект пользователя осуществляется ТОЛЬКО после попытки фиксации попытки
 * подтверждения. Это делается с целью того, чтобы пользователь, после перенаправления
 * в корень сайта, получал информацию о себе уже с учетом результатов попытки подтверждения почты.
 */
router.get('/user/emailConfirmation', function (req, res, next) {

	let confirmationKey = req.query.confirmationKey;

	// Если параметр confirmationKey является UUID значением
	// (это проверка на валидность входящего параметра в целом).
	// TODO заюзать waterfall у async для случая с обновлением users и sessions.
	if (confirmationKey && validator.isUUID(confirmationKey)) {

		return EmailConfirmationModel.confirm(confirmationKey, (error) => {

			if (error) {

				logger.error(error);

			}

			res.redirect('/');

		});

	}

	res.redirect('/');

});
