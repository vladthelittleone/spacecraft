'use strict';

StatisticsStorage.$inject = ['connection'];

module.exports = StatisticsStorage;

/**
 * Created by Ivan on 06.10.2016.
 */
function StatisticsStorage(connection) {

	var that = {};

	var userProgress;

	that.getUserProgress = getUserProgress;
	that.saveUserProgress = saveUserProgress;

	initialize();

	return that;

	function initialize() {

		connection.getUserProgress(setUserProgress);

	}

	/**
	 * Возвращаем инфу о прогрессе юзера
	 */
	function getUserProgress() {

		return userProgress;

	}

	/**
	 * Все необходимые дейтсвия для обновления
	 * данных по прогрессу юзера( нужны для графиков)
	 */
	function saveUserProgress(score) {

		connection.updateUserProgress(score);

		if(userProgress.length >= 30){

			userProgress.shift();

		}

		userProgress.push(score);
	}

	function setUserProgress(newData){

		userProgress = newData || [];

	}
}
