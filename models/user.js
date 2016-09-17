var crypto = require('crypto');
var async = require('async');
var mongoose = require('utils/mongoose');
var AuthError = require('error').AuthError;
var Lodash = require('lodash');

var Schema = mongoose.Schema;

var schema = new Schema({
	email:              {
		type:     String,
		unique:   true,
		required: true
	},
	username:           {
		type: String
	},
	hashedPassword:     {
		type:     String,
		required: true //Этот момент стоит обсудить
		// если это поле будет обязательным,
		// то при реге чувака через вк то что сюда писать
	},
	vkId:		        {
		type:     String
	},
	salt:               {
		type:     String,
		required: true
	},
	isSubscribeOnEmail: {
		type:     Boolean,
		required: true
	},
	created:            {
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
schema.statics.authorize = authorize;
schema.statics.registration = registration;
schema.statics.getUserCreationDate = getUserCreationDate;
schema.statics.findOrCreateVKUser = findOrCreateVKUser;

exports.User = mongoose.model('User', schema);

function encryptPassword(password) {

	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');

}

function checkPassword(password) {

	return this.encryptPassword(password) === this.hashedPassword;

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
function authorize(email, password, callback) {

	var User = this;

	async.waterfall([

		function (callback) {

			User.findOne({email: email}, callback);

		},
		function (user, callback) {

			if (user) {

				if (user.vkId)
				{
					// todo исравкить текст
					callback(new AuthError("Войд"));
				}
				else if (user.checkPassword(password)) {

					callback(null, user);

				} else {

					callback(new AuthError('Пароль неверен'));

				}

			} else {

				callback(new AuthError('Пользователь не найден'));

			}
		}

	], callback);

}

function registration(email, password, isSubscribeOnEmail, callback) {

	var User = this;

	async.waterfall([

		function (callback) {

			User.findOne({email: email}, callback);

		},
		function (user, callback) {

			if (!user) {

				var newbie = new User({

					email: email,
					password: password,
					isSubscribeOnEmail: isSubscribeOnEmail

				});

				newbie.save(function (err) {

					if (err) {

						return callback(err);

					}

					callback(null, newbie);

				});
			}
			else {

				callback(new AuthError('Пользователь уже существует'));

			}
		}
	], callback);

}

/**
 * Функция ищет пользователя по его vk id
 * если пользователь не найдет функция создает нового пользователя 
 * в базе
 */
function findOrCreateVKUser (vkId, email, callback) {

	var User = this;

	async.waterfall([

			(callback) => {

				User.findOne({vkId: vkId}, callback);

			},
			(user, callback) => {

				if (!user) {

					var newbie = new User ({

						email: email,
						vkId: vkId,
						// Вот тут хз как быть, вроде бы в это поле ничего не надо писать
						// но тогда поля отвечающие за хранение хэшированого пароля
						// и соли нужно сделать не обязательными, что тоже не очень то и хорошо
						password: email,
						// и не понятно как быть с этим параметром
						// ибо его задание через вк тот еще геммор
						// к томуже у вк юзера может быть не привязанно мыло
						// в общем это стоит обсудить
						isSubscribeOnEmail: false

					});

					newbie.save((err) => {

						if (err) {

							return callback(err);

						}

						callback(null, newbie, true);

					});
				}

				callback(null, user, false);
			}

	], callback);

}

/**
 * Возвращает дату создания акка пользователя.
 */
function getUserCreationDate(userID, callback) {

	var User = this;

	async.waterfall([

		function (callback) {

			User.findById(userID, callback);

		},
		function (user, callback) {

			callback(user ? user.created : null);

		}

	], callback)

}
