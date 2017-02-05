'use strict';

StatisticsStorage.$inject = ['connection'];

module.exports = StatisticsStorage;

var lodash = require('lodash');

/**
 * Created by Ivan on 06.10.2016.
 */
function StatisticsStorage (connection) {

	var that = {};

	var userProgress = [];

	that.getUserProgress = getUserProgress;
	that.saveUserProgress = saveUserProgress;

	return that;

	/**
	 * Возвращаем инфу о прогрессе юзера
	 */
	function getUserProgress (success, error) {

		if(!lodash.isEmpty(userProgress)){

			success && success(userProgress);

		} else {

			connection.getUserProgress(function (result) {

				if(result){

					userProgress = result.data;
										   userProgress = result;

					callback && callback(userProgress);
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
	function saveUserProgress (score) {

		connection.updateUserProgress(score, function (result) {

			userProgress = result.data;

		});

	}

}
