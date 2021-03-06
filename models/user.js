'use strict';

var crypto = require('crypto');
var async = require('async');
var mongoose = require('utils/mongoose');
var HttpError = require('error').HttpError;

var HttpStatus = require('http-status-codes');

var lodash = require('lodash');

var Schema = mongoose.Schema;

var schema = new Schema({
	email:                     {
		type:      String,
		lowercase: true
	},
	name:                      {
		type: String
	},
	hashedPassword:            {
		type: String
	},
	vkId:                      {
		type:   String,
		unique: true,
		sparse: true
	},
	salt:                      {
		type: String
	},
	subscriptionToMailingFlag: {
		type: Boolean
	},
	emailConfirmationFlag:     {
		type: Boolean
	},
	created:                   {
		type:    Date,
		default: Date.now
	}
});

schema.virtual('password')
	  .set(function (password) {

		  this._plainPassword = password;
		  this.salt = Math.random() + '';
		  this.hashedPassword = this.encryptPassword(password);

	  })
	  .get(function () {

		  return this._plainPassword;

	  });

schema.methods.encryptPassword = encryptPassword;
schema.methods.checkPassword = checkPassword;

schema.statics.authenticateEmailUser = authenticateEmailUser;
schema.statics.registerEmailUser = registerEmailUser;

schema.statics.getUserCreationDate = getUserCreationDate;

schema.statics.findOrCreateVKUser = findOrCreateVKUser;

module.exports = mongoose.model('User', schema);

function encryptPassword(password) {

	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');

}

function checkPassword(password) {

	return password && this.encryptPassword(password) === this.hashedPassword;

}

/**
 * 1. Получить юзера с таким email из базы.
 * 2. Такой посетитель найден?
 *  Да - сверить пароль вывозвом checkPassword.
 *  Нет - создать нового пользователя
 * 3. Авторизация успешна?
 *  Да - сохранить _id посетителя в сессии: session.user = user._id и ответить 200
 *  Нет - вывести ошибку (403 или другую)
 * @param email
 * @param password
 * @param callback
 */
function authenticateEmailUser(email, password, callback) {

	let User = this;

	async.waterfall([
						function (callback) {

							User.findOne({
											 email: email,
											 vkId:  {$exists: false}
										 }, callback);

						},
						function (user, callback) {

							// Если найден пользователь и пароль совпадает с заданным.
							if (user && user.checkPassword(password)) {

								return callback(null, user);

							}

							callback(new HttpError(HttpStatus.UNAUTHORIZED, 'Неверные данные для авторизации'));

						}

					], callback);

}

function registerEmailUser(email, password, subscriptionToMailingFlag, callback) {

	let User = this;

	async.waterfall([
						function (callback) {

							User.findOne({
											 email: email,
											 vkId:  {$exists: false}
										 }, callback);

						},
						function (user, callback) {

							if (!user) {

								let newbie = new User({

									email:                     email,
									password:                  password,
									name:                      lodash.first(email.split('@')),
									subscriptionToMailingFlag: subscriptionToMailingFlag

								});

								newbie.save(function (err) {

									callback(err, newbie);

								});
							}
							else {

								callback(new HttpError(403, 'Такой пользователь уже существует'));

							}
						}

					], callback);

}

/**
 * Функция ищет пользователя по его vk id
 * если пользователь не найдет функция создает нового пользователя в базе
 */
function findOrCreateVKUser(vkId, email, name, callback) {

	let User = this;

	async.waterfall([

						(callback) => {

							User.findOne({vkId: vkId}, callback);

						},
						(user, callback) => {

							if (!user) {

								let newbie = new User({

									email: email,
									vkId:  vkId,
									name:  name

								});

								newbie.save((err) => {

									callback(err, newbie, true);

								});
							}
							else {

								callback(null, user, false);

							}
						}

					], callback);

}

/**
 * Возвращает дату создания акка пользователя.
 */
function getUserCreationDate(userID, callback) {

	let User = this;

	async.waterfall([

						function (callback) {

							User.findById(userID, callback);

						},
						function (user, callback) {

							callback(user ? user.created : null);

						}

					], callback)

}
