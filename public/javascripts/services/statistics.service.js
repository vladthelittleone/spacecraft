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
		currentPoints:			    undefined,
		// Число запусков интерпретатора.
		runCount: 					0,
		initialize: 		        initialize,
		restore:                    restore,
		incRunCount:                incRunCount,
		subPointsForException:      subPointsForException,
		subPointsForIncorrectInput: subPointsForIncorrectInput
	};

	return that;

	function initialize( _lessonPoints ) {

		lessonPoints = _lessonPoints;

		that.currentPoints = lessonPoints.totalPoints;

	}

	function restore(restoreObj) {

		var restoreStatistics = restoreObj.statistics;

		that.runCount = restoreStatistics.runCount;
		that.currentPoints = restoreStatistics.currentPoints;

	}

	function incRunCount() {

		that.runCount++;

	}

	function subPointsForException() {

		that.currentPoints = that.currentPoints - lessonPoints.exception;

	}

	function subPointsForIncorrectInput() {

		that.currentPoints = that.currentPoints - lessonPoints.incorrectInput;

	}

}
