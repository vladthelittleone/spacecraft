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
		// СТРОГО undefined!
		bestPoints:                 undefined,
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

		reset();

	}

	/**
	 * Обновляем ЛУЧШИЙ результат по очкам, в соответствиии с набранными
	 * очками по уроку.
	 *
	 * Маленький комментарий к работе метода.
	 * Нулевой результат это тоже результат! Не стоит забывать, результат по очкам может
	 * быть и отрицательным.
	 * Поэтому, первоначальная инициализация поля bestPoints нулем НЕДОПУСТИМА.
	 * Представим следующую ситауцию. Ниже представлена последовательность действий
	 * для перезаписи текущего максимума по очкам за урок:
	 *
	 * if ( currentPoints > bestPoints ) then {
	 *
	 * 	 bestPoints = currentPoints;
	 *
	 * }
	 *
	 * В случае, когда пользователь проходит урок в самый первый раз, и значение
	 * поля bestPoints инициализировано нулем, отрицательные очки за урок не будут записаны
	 * в максимум, как первоначальный результат, так как нуль будет считаться
	 * НАИЛУЧШИМ результатом (в сравнении с текущим отрицательным), хотя по факту это совершенно не так.
	 * Наилучшего результат мы не имеем. И в таком случае мы просто должны записать в него текущий результат.
	 *
	 * Именно поэтому bestPoints следует инициализировать значением undefined - это
	 * некий флаг того, что лучший результат еще не назначался.
	 *
	 */
	function updateBestPoints() {

		if (that.bestPoints === undefined) {

			// Просто переписываем имеющееся число очков как НАИЛУЧШИЙ результат,
			// так как это самый первый результат по уроку.
			that.bestPoints = that.currentPoints;

		}
		else {

			// В этом случае, если текущий результат по очкам больше,
			// то считаем его наилучшим.
			that.bestPoints = ( that.currentPoints > that.bestPoints ) ? that.currentPoints :
																		 that.bestPoints;

		}

	}

	/**
	 * Обновляем ЛУЧШЕЕ число запусков интерпретатора, в соответствии с числом
	 * его запусков по уроку.
	 */
	function updateBestRunCount() {

		if ( that.bestRunCount === 0 ) {

			// Мы еще не имеем лучшего результата.
			// Поэтому текущий результат и есть наилучший.
			that.bestRunCount = that.currentRunCount;

		}
		else {

			// Нужно не забывать, что именно НАИМЕНЬШЕЕ число
			// запусков интерпретатора будет считаться ЛУЧШИМ.
			that.bestRunCount = ( that.currentRunCount > that.bestRunCount ) ? that.bestRunCount:
																			   that.currentRunCount;

		}

	}

	/**
	 * Сброс ТЕКУЩИХ результатов по уроку.
	 * Текущие очки сбрасываются в значение, которое
	 * назначено по уроку!
	 *
	 * Лучшие результаты не трогаем.
	 */
	function reset() {

		that.currentPoints = lessonPoints.totalPoints;
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
