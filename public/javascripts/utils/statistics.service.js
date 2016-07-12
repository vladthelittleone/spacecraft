'use strict';

module.exports = Statistics;

/**
 * Сервис хранения статистики пользователя по игре.
 *
 * Created by Ivan on 10.11.2015.
 */
function Statistics ()  {

	var lessonPoints;

	var that = {};

	that.bestScore = 0;
	that.currentScore =  0;
	// Число запусков интерпретатора.
	that.bestRunCount = 0;
	that.currentRunCount = 0;
	that.initialize = initialize;
	that.updateBestScore = updateBestScore;
	that.updateBestRunCount = updateBestRunCount;
	that.updateBestResults = updateBestResults;
	that.reset = reset;
	that.incRunCount = incRunCount;
	that.subPointsForException = subPointsForException;
	that.subPointsForIncorrectInput = subPointsForIncorrectInput;

	return that;

	function initialize( _lessonPoints, restoredStatistics ) {

		lessonPoints = _lessonPoints;

		if (!restoredStatistics) {

			reset();

		}
		else {

			restore(restoredStatistics);
		}

	}

	/**
	 * Обновляем ЛУЧШИЙ результат по очкам, в соответствиии с набранными
	 * очками по уроку.
	 */
	function updateBestScore() {

		that.bestScore = Math.max( that.currentScore, that.bestScore );

	}

	/**
	 * Обновляем ЛУЧШЕЕ число запусков интерпретатора, в соответствии с числом
	 * его запусков по уроку.
	 */
	function updateBestRunCount() {

		if (!that.bestRunCount) {

			// Мы еще не имеем лучшего результата.
			// Поэтому текущий результат и есть наилучший.
			that.bestRunCount = that.currentRunCount;

		}
		else {

			// Нужно не забывать, что именно НАИМЕНЬШЕЕ число
			// запусков интерпретатора будет считаться ЛУЧШИМ.
			that.bestRunCount = Math.min(that.currentRunCount, that.bestRunCount);

		}

	}

	/**
	 * Подразумевает обновление всех имеющихся
	 * полей по лучшим результатам.
	 */
	function updateBestResults() {

		updateBestScore();
		updateBestRunCount();

		reset();

	}

	/**
	 * Сброс ТЕКУЩИХ результатов по уроку.
	 * Текущие очки сбрасываются в значение, которое
	 * назначено по уроку!
	 *
	 * Лучшие результаты не трогаем.
	 */
	function reset() {

		that.currentScore = lessonPoints.totalPoints;
		that.currentRunCount = 0;

	}

	function restore(restoreObj) {

		var restoreStatistics = restoreObj.statistics;

		that.bestRunCount = restoreStatistics.bestRunCount;
		that.currentRunCount = restoreStatistics.currentRunCount;

		that.bestScore = restoreStatistics.bestScore;
		that.currentScore = restoreStatistics.currentScore;

	}

	function incRunCount() {

		that.currentRunCount++;

	}

	function subCurrentScore(value) {

		that.currentScore = that.currentScore - value;

		// Очки за урок не могут быть отрицательными!
		that.currentScore = Math.max(0, that.currentScore);

	}

	function subPointsForException() {

		subCurrentScore(lessonPoints.exception)

	}

	function subPointsForIncorrectInput() {

		subCurrentScore(lessonPoints.incorrectInput);

	}

}
