'use strict';

module.exports = Statistics;

/**
 * Сервис хранения статистики пользователя по игре.
 *
 * Created by Ivan on 10.11.2015.
 */
function Statistics ()  {

	var lessonPoints;

	var that = {
		//Текущее число очков по уроку.
		bestPoints:                 0,
		currentPoints:			    0,
		// Число запусков интерпретатора.
		bestRunCount:               0,
		currentRunCount: 			0,
		initialize: 		        initialize,
		updateBestPoints:           updateBestPoints,
		updateBestRunCount:			updateBestRunCount,
		reset:                      reset,
		restore:                    restore,
		incRunCount:                incRunCount,
		subPointsForException:      subPointsForException,
		subPointsForIncorrectInput: subPointsForIncorrectInput
	};

	return that;

	function initialize( _lessonPoints ) {

		lessonPoints = _lessonPoints;

		// Устанавливаем текущее число очков,
		// как настроено по самому уроку.
		that.currentPoints = lessonPoints.totalPoints;

	}

	/**
	 * Обновляем ЛУЧШИЙ результат по очкам, в соответствиии с набранными
	 * очками по уроку.
	 */
	function updateBestPoints() {

		that.bestPoints = ( that.currentPoints > that.bestPoints ) ? that.currentPoints:
																	 that.bestPoints;

	}

	/**
	 * Обновляем ЛУЧШЕЕ число запусков интерпретатора, в соответствии с числом
	 * его запусков по уроку.
	 */
	function updateBestRunCount() {

		that.bestRunCount = ( that.currentRunCount > that.bestRunCount ) ? that.currentRunCount:
																		   that.bestRunCount;

	}

	/**
	 * Сброс ТЕКУЩИХ результатов по уроку.
	 * Лучшие результаты не трогаем.
	 */
	function reset() {

		that.currentPoints = 0;
		that.currentRunCount = 0;

	}

	function restore(restoreObj) {

		var restoreStatistics = restoreObj.statistics;

		that.bestRunCount = restoreStatistics.bestRunCount;
		that.bestPoints = restoreStatistics.bestPoints;
		that.currentRunCount = restoreStatistics.currentRunCount;
		that.currentPoints = restoreStatistics.currentPoints;

	}

	function incRunCount() {

		that.currentRunCount++;

	}

	function subPointsForException() {

		that.currentPoints = that.currentPoints - lessonPoints.exception;

	}

	function subPointsForIncorrectInput() {

		that.currentPoints = that.currentPoints - lessonPoints.incorrectInput;

	}

}
