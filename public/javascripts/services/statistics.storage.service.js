'use strict';

StatisticsStorage.$inject = ['connection'];

module.exports = StatisticsStorage;

var lodash = require('lodash');

/**
 * Created by Ivan on 06.10.2016.
 */
function StatisticsStorage(connection) {

	var that = {};

	var userProgress = [];

	that.getUserProgress = getUserProgress;
	that.saveUserProgress = saveUserProgress;

	return that;

	/**
	 * Возвращаем инфу о прогрессе юзера
	 */
	function getUserProgress(success, error) {

		if (!lodash.isEmpty(userProgress)) {

			success && success(userProgress);

		} else {

			connection.getUserProgress(function (result) {

										   if (result) {

											   // TODO просить сервис http кэшировать
											   userProgress = result;

										   }

										   success && success(result);

									   },
									   error);

		}

	}

	/**
	 * Все необходимые дейтсвия для обновления
	 * данных по прогрессу юзера( нужны для графиков)
	 */
	function saveUserProgress(score) {

		// Сохраняем только новое значение
		if(lodash.last(userProgress) != score) {

			connection.updateUserProgress(score, function (result) {

				userProgress = result.data;

			});

		}
	}

}
