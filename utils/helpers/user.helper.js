/**
 * Created by root on 31.03.17.
 */

const lodash = require('lodash');

const async = require('async');

const UserModel = require('./../../models/user');
const EmailConfirmationModel = require('./../../models/email.confirmation');

const HttpStatus = require('http-status-codes');

const HttpError = require('error').HttpError;

module.exports = UserHelper();

function UserHelper() {

	let t = {};

	t.prepareUserObjectForSession = prepareUserObjectForSession;

	return t;

	function prepareUserObjectForSession(idUser, callback) {

		async.waterfall([
							function (callback) {

								UserModel.findById(idUser, callback);

							},

							function (user, callback) {

								if (user) {

									let userObj = user._doc;

									if (isItEmailUser(userObj)) {

										return processingAsEmailUser(userObj, callback);

									}

									return callback(null, userObj);
								}

								// Редкая ситуация (в коллекции sessions имеется объект сессии, который ссылается
								// на несуществующего, в коллекции users, пользователя).
								callback(HttpStatus.INTERNAL_SERVER_ERROR);

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
							function (callback) {

								EmailConfirmationModel.findOne({idUser: userObj._id}, callback);

							},

							function (emailConfirmationData, callback) {

								if (emailConfirmationData) {

									userObj.emailConfirmationFlag = emailConfirmationData.result;

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
