/**
 * Created by root on 31.03.17.
 */

const lodash = require('lodash');

const async = require('async');

const UserModel = require('./../../models/user');
const EmailConfirmationModel = require('./../../models/email.confirmation');

const logger = require('../log')(module);

const HttpStatus = require('http-status-codes');

module.exports = UserHelper();

function UserHelper() {

	let t = {};

	t.prepareUserObjectForSession = prepareUserObjectForSession;

	return t;

	function prepareUserObjectForSession(idUser, callback) {

		async.waterfall([
							(callback) => {

								UserModel.findById(idUser, callback);

							},

							(user, callback) => {

								if (user) {

									let userObj = user._doc;

									if (isItEmailUser(userObj)) {

										return processingAsEmailUser(userObj, callback);

									}

									userObj.needToConfirmEmail = false;

									return callback(null, userObj);
								}

								logger.warn("It's a really seldom situation. There is no such user " +
											"into users collection, but his session into sessions collection exists");

								// Редкая ситуация (в коллекции sessions имеется объект сессии, который ссылается
								// на несуществующего, в коллекции users, пользователя).
								// Такая ситуация может быть спровоцирована посредством неправильного ведения
								// коллекций на сервере mongo (например коллецию users очистили, a sessions забыли).
								callback(HttpStatus.UNAUTHORIZED);

							}
						], callback);

	}

	/**
	 * Метод обработки объекта пользователя как email пользователя.
	 * Включает логику внедрения необходимых свойств в объект на основании того, что это email пользовател.
	 * К примеру, флаг подтверждения почты.
	 * @param userObj исходный объект пользователя, полученный из коллекции Users.
	 * @param callback вторым параметром будет передан окончательный вид объекта.
	 */
	function processingAsEmailUser(userObj, callback) {

		async.waterfall([
							(callback) => {

								EmailConfirmationModel.findOne({idUser: userObj._id}, callback);

							},

							(emailConfirmationData, callback) => {

								if (emailConfirmationData) {

									// В result лежит статус подтверждения почты (true - подтверждена; false - нет).
									// Поэтому, для семантики флага needToConfirmEmail требуется отрицание статуса
									// подтверждения.
									userObj.needToConfirmEmail = !emailConfirmationData.result;

								}

								callback(null, userObj);

							}
						], callback);
	}

	/**
	 * Вспомогательный метод идентификации email пользователя.
	 * На момент текущей реализации, достаточным является рассмотрение наличия vkId (он не определен у email юзеров).
	 */
	function isItEmailUser(user) {

		return lodash.isNil(user.vkId);

	}

}
