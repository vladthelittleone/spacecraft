/**
 * @author greezlock
 * @since 13.04.17
 */

const async = require('async');
const lodash = require('lodash');
const emailExistence = require('email-existence');
const HttpStatus = require('http-status-codes');

const logger = require('./../../../utils/log')(module);
const EmailConfirmationModel = require('./../../../models/email.confirmation.js');
const emailConfirmation = require('../../email/confirmation/index');
var HttpError = require('./../../../error').HttpError;

module.exports = EmailConfirmationHelper();

/**
 * Вспомогательный модуль, который берет на себя работу по вопросам подтверждения почты
 * на уровне авторизации пользователя.
 */
function EmailConfirmationHelper() {

	const that = {};

	that.initEmailConfirmationFields = initEmailConfirmationFields;
	that.sendEmailConfirmation = sendEmailConfirmation;
	that.checkEmailForExistence = checkEmailForExistence;

	return that;

	function sendEmailConfirmation(user, callback) {

		emailConfirmation.send(user, (error) => {

			if (error) {

				logger.error(error);

			}

		});

		callback(null);

	}

	/**
	 * Метод обработки объекта пользователя как email пользователя.
	 * Включает логику внедрения необходимых свойств в объект на основании того, что это email пользователь.
	 * К примеру, флаг подтверждения почты.
	 * @param userObj исходный объект пользователя, полученный из коллекции Users.
	 * @param callback вторым параметром будет передан окончательный вид объекта.
	 */
	function initEmailConfirmationFields(userObj, callback) {

		async.waterfall([
							// Селектриуем данные по подтверждению почты для юзера.
							tryToSelectEmailConfirmationData,
							// На основании данных о подтверждении, пытаемся установить поле о подтверждении.
							initEmailConfirmationFlag

						], callback);


		// Для лаконичности определения 'водопада' в async, определеяем коллбэки отдельно в рамках
		// этого же контекста.
		function tryToSelectEmailConfirmationData(callback) {

			if (isItEmailUser(userObj)) {

				return EmailConfirmationModel.findOne({idUser: userObj._id}, callback);

			}

			// Если это не email пользователь, то соотв. образом сигнализируем о том, что данных
			// о подтверждении нет.
			// Не забываем о том, что в случае значения undefined (не указание параметра) async его
			// попросту не передаст следующему callback'y.
			callback(null, null);

		}

		/**
		 * Попытка инициализировать поле о необходимости подтвердить почту на основании
		 * данных о подтверждении почты пользователем.
		 */
		function initEmailConfirmationFlag(emailConfirmationData, callback) {

			userObj.needToConfirmEmail = !lodash.isNil(emailConfirmationData) && !emailConfirmationData.result;

			callback(null, userObj);

		}

	}

	function checkEmailForExistence(normalEmail, callback) {

		emailExistence.check(normalEmail, (error, result, undetermined) => {

			// 3-им параметром для коллбэка библиотека emailExistence предоставляет статус неопределенности.
			// Если он определен, значит произошла ошибка связанная больше с технической составляющей:
			// - timeout по подключению; неопределенный ответ от SMTP сервера или DNS;
			// В общем случае, это повод ответить статусом 500 и тем самым попросить пользователя повторить
			// запрос позже.
			// Также, если определен error (его формат заранее проанализирован) и значение
			// его поля code равно "EREFUSED", это также повод ответить 500 кодом.
			if (undetermined || (error && error.code === "EREFUSED")) {

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

	/**
	 * Вспомогательный метод идентификации email пользователя.
	 * На момент текущей реализации, достаточным является рассмотрение наличия vkId (он не определен у email юзеров).
	 */
	function isItEmailUser(user) {

		return lodash.isNil(user.vkId);

	}

}
