var crypto = require('crypto');
var async = require('async');
var mongoose = require('utils/mongoose');

var Metrics = require('models/metrics').Metrics;

var Schema = mongoose.Schema;

var schema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	username: {
		type: String
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

schema.methods.encryptPassword = function (password)
{
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
	.set(function (password)
	{
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function ()
	{
		return this._plainPassword;
	});


schema.methods.checkPassword = function (password)
{
	return this.encryptPassword(password) === this.hashedPassword;
};

var AuthError = require('error').AuthError;

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
schema.statics.authorize = function (email, password, callback)
{
	var User = this;

	async.waterfall(
	[
		function (callback)
		{
			User.findOne({email: email}, callback);
		},
		function (user, callback)
		{
			if (user)
			{
				if (user.checkPassword(password))
				{
					Metrics.update(user, function (metrics)
					{
						metrics.visits += 1;
						metrics.lastEntryDate = new Date();

						metrics.save();

					});

					callback(null, user);
				}
				else
				{
					callback(new AuthError('Пароль неверен'));
				}
			}
			else
			{
				callback(new AuthError('Пользователь не найден'));
			}
		}
	], callback);
};

schema.statics.registration = function (email, password, callback)
{
	var User = this;

	async.waterfall(
	[
		function (callback)
		{
			User.find({email: email}, callback);
		},
		function (user, callback)
		{
			if (!user.length)
			{
				var newbie = new User({email: email, password: password});

				newbie.save(function (err)
				{
					if (err)
					{
						return callback(err);
					}

					callback(null, newbie);
				});
			}
			else
			{
				callback(new AuthError('Пользователь уже существует'));
			}
		}
	], callback);
};

// возвращает дату создание акка пользователся
schema.statics.getUserCreationDate = function (userID, callback)
{
	var User = this;

	async.waterfall(
	[
		function (callback)
		{
			User.findOne({_id: userID}, callback);
		},
		function (user, callback)
		{
			callback(user? user.created: null);
		}

	], callback)
};

exports.User = mongoose.model('User', schema);
