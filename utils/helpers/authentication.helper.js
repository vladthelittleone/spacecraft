'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 02.10.16
 */

const StatisticModel = require('models/statistic');

const logger = require('../log')(module);

const emailExistence = require('email-existence');

const emailConfirmation = require('../../utils/email/confirmation/email.confirmation');

const HttpStatus = require('http-status-codes');

const HttpError = require('error').HttpError;

module.exports = AuthenticationHelper();

function AuthenticationHelper() {

	var that = {};

	that.initTotalFinalScore = initTotalFinalScore;

	that.checkEmailForExistence = checkEmailForExistence;
	that.sendEmailConfirmation = sendEmailConfirmation;

	return that;

	function initTotalFinalScore(user) {

		let totalFinalScore = 0;
		let userId = user._doc._id;

		/**
		 * Регистрируем пользователя в статистике с начальной историей прохождения уроков.
		 */
		StatisticModel.updateTotalFinalScore(userId, totalFinalScore, (error) => {

			// Если произошла ошибка в процессе сохранения статистики, достаточно лишь
			// отписать об этом в лог.
			// На сам процесс регистрации это никак не повлияет, так что спокойно отвечаем
			// пользователю, даже при ошибке.
			if (error) {

				logger.info('some problem with save of statistics for the new registered user: ',
							error);

			}

		});

	}

	function sendEmailConfirmation(user, callback) {

		emailConfirmation.send(user, (error) => {

			if (error) {

				logger.error(error);

			}

		});

		callback(null);

	}

	function checkEmailForExistence(normalEmail, callback) {

		emailExistence.check(normalEmail, (error, result, undetermined) => {

			// 3-им параметром для коллбэка либа emailExistence предоставляет статус неопределенности.
			// Если он определен, значит произошла ошибка связанная с больше с техничесокой составляющей:
			// - timeout по подключению; неопределенный ответ от SMTP сервера или DNS;
			// В общем случае, это повод ответит статусом 500 и тем самым попросить пользователя повторить
			// запрос позже.
			if (undetermined) {

				logger.error(error);

				return callback(HttpStatus.INTERNAL_SERVER_ERROR);

			}

			if (!result) {

				logger.warn('email does not exist: ', normalEmail);

				return callback(new HttpError(HttpStatus.UNPROCESSABLE_ENTITY,
					"Пожалуйста, укажите действующий email адрес"));

			}

			return callback(null);

		});

	}

}
