'use strict';

var async = require('async');

var dataBaseRequest = {};

// возвращает мыла всех зареганных юзеров
dataBaseRequest.getEmailAllRegisteredUsers = function (User, callback) {

	async.waterfall([

		function (_callback) {

			User.find(_callback);

		},
		function (data, _callback) {

			var results = [];

			// вызов find в любом случае вернет коллекцию
			// так что проверять есть ли там что то или нет
			// нет смысла
			data.forEach(function (value) {
				// выкидываем всю лишнюю инфу
				// оставляя только емайлы

				// делаем то что пришло из базы объектом
				var user = value.toObject();

				results.push(user.email);

			});

			_callback(results);
		}

	], callback);
};

// возвращает оценки пользователей за уроки
dataBaseRequest.getStarsSummary = function (Statistics, callback) {

	async.waterfall([

		function (_callback) {

			Statistics.find(_callback);

		},
		function (data, _callback) {

			var results = [];

			// вызов find в любом случае вернет коллекцию
			// так что проверять есть ли там что то или нет
			// нет смысла
			data.forEach(function (item) {

				// делаем то что пришло из базы объектом
				var value = item.toObject();
				var lessons = value.lessons;
				
				if (lessons) {

					lessons.forEach(function (_item, i) {

						var stars = _item.stars;

						// чекаем проставил ли пользователь звездочки уроку
						if (stars) {

							if (results[i]) {

								results[i].sum += stars;
								results[i].userCount++;

							}
							else {

								results[i] = {

									sum: stars,
									userCount: 1

								};

							}

						}

					});

				}

			});

			_callback(results);

		}

	], callback);
};

module.exports = dataBaseRequest;
