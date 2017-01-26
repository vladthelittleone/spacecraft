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
	function getUserProgress(callback) {

		if(!lodash.isEmpty(userProgress)){

			callback && callback(userProgress);

		} else {

			connection.getUserProgress(function (result) {

				if(result){

					userProgress = result.data;

					callback && callback(userProgress);
				}

			});
		}

	}

	/**
	 * Все необходимые дейтсвия для обновления
	 * данных по прогрессу юзера( нужны для графиков)
	 */
	function saveUserProgress(score) {

		connection.updateUserProgress(score, function (result) {

			userProgress = result.data;

		});

	}

}
