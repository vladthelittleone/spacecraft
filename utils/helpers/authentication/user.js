/**
 * Created by root on 31.03.17.
 */

const lodash = require('lodash');
const async = require('async');
const HttpStatus = require('http-status-codes');

const UserModel = require('./../../../models/user');
const logger = require('../../log')(module);
const emailConfirmationHelper = require('./email.confirmation');
const StatisticModel = require('./../../../models/statistic');

module.exports = UserHelper();

function UserHelper() {

	let t = {};

	t.prepareUserObjectForSession = prepareUserObjectForSession;
	t.initTotalFinalScore = initTotalFinalScore;

	return t;

	function prepareUserObjectForSession(idUser, callback) {

		async.waterfall([
							// Селектируем пользователя из базы
							callback => UserModel.findById(idUser, callback),
							// Инициализируем необходимые поля для объекта пользователя.
							async.apply(initNecessaryFields)
						], callback);

	}

	/**
	 * Инициализация объекта пользователя дополнительными нужными полями.
	 */
	function initNecessaryFields(user, callback) {

		if (user) {

			let userObj = user._doc;

			return async.waterfall([
									   // Инициализируем поля, касающиеся подтверждения почты.
									   async.apply(emailConfirmationHelper.initEmailConfirmationFields, userObj)
								   ], callback(null, userObj));

		}

		logger.warn("It's a really seldom situation. There is no such user " +
					"into users collection, but his session into sessions collection exists");

		// Редкая ситуация (в коллекции sessions имеется объект сессии, который ссылается
		// на несуществующего, в коллекции users, пользователя).
		// Такая ситуация может быть спровоцирована посредством неправильного ведения
		// коллекций на сервере mongo (например коллецию users очистили, a sessions забыли).
		callback(HttpStatus.UNAUTHORIZED);

	}

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

}
