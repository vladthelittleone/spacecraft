'use strict';

var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Statistics = mongoose.model('Statistic', new Schema());

var dataBaseRequest = {};

// возвращает оценки пользователей за уроки
dataBaseRequest.getStarsSummary = function (callback) {

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
