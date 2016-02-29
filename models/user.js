var crypto = require('crypto');
var async = require('async');
var mongoose = require('utils/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
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
 * 1. Получить юзера с таким username из базы.
 * 2. Такой посетитель найден?
 *  Да - сверить пароль вывозвом checkPassword.
 *  Нет - создать нового пользователя
 * 3. Авторизация успешна?
 *  Да - сохранить _id посетителя в сессии: session.user = user._id и ответить 200
 *  Нет - вывести ошибку (403 или другую)
 * @param username
 * @param password
 * @param callback
 */
schema.statics.authorize = function (username, password, callback)
{
	var User = this;

	async.waterfall(
	[
		function (callback)
		{
			User.findOne({username: username}, callback);
		},
		function (user, callback)
		{
			if (user)
			{
				if (user.checkPassword(password))
				{
					callback(null, user);
				}
				else
				{
					callback(new AuthError("Пароль неверен"));
				}
			}
			else
			{
				var newbie = new User({username: username, password: password});

				newbie.save(function (err)
				{
					if (err)
					{
						return callback(err);
                    }

					callback(null, newbie);
				});
			}
		}
	], callback);
};


exports.User = mongoose.model('User', schema);
