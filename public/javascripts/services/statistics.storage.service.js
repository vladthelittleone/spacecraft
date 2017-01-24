'use strict';

StatisticsStorage.$inject = ['connection'];

module.exports = StatisticsStorage;

/**
 * Created by Ivan on 06.10.2016.
 */
function StatisticsStorage(connection) {

	var that = {};

	// Размер массива userProgress,
	// изначально подрузамевалось,
	// что 30 - количество дней,
	// на дни забили число осталось
	var LIMIT_TO_USER_PROGRESS = 30;

	var userProgress = [];

	that.getUserProgress = getUserProgress;
	that.saveUserProgress = saveUserProgress;

	return that;

	/**
	 * Возвращаем инфу о прогрессе юзера
	 */
	function getUserProgress(callback) {

		if(userProgress){

			callback && callback(userProgress);

		} else {

			connection.getUserProgress(function (result) {

				if(result){

					userProgress = result;

					callback && callback(result);
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

			console.log(result);

		});

		if(userProgress.length >= LIMIT_TO_USER_PROGRESS) {

			userProgress.shift();

		}

		userProgress.push(score);
	}

}
