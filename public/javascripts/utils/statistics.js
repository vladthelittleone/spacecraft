'use strict';

module.exports = Statistics;

/**
 * Сервис хранения статистики пользователя по игре.
 *
 * Created by Ivan on 10.11.2015.
 */
function Statistics ()  {

	var lessonPoints;

	var penaltyPointsForGame = 0;

	var that = {};

	// Инициализируем начальное значение параметров статистики.
	resetAllResults();

	that.initialize = initialize;
	that.updateBestScore = updateBestScore;
	that.updateBestRunCount = updateBestRunCount;
	that.updateBestResults = updateBestResults;
	that.reset = resetAllResults;
	that.incRunCount = incRunCount;
	that.subPointsForException = subPointsForException;
	that.subPointsForIncorrectInput = subPointsForIncorrectInput;
	that.getLessonPoints = getLessonPoints;
	that.subCurrentScore = subCurrentScore;
	that.setPenaltyPointsForGame = setPenaltyPointsForGame;
	that.subPenaltyPointsForGame = subPenaltyPointsForGame;

	return that;


	function initialize(_lessonPoints, ctx) {

		lessonPoints = _lessonPoints;

		resetAllResults();

		if (ctx) {

			restore(ctx.statistics);

		}

	}

	/**
	 * Метод сброса состояния очков по игре.
	 * Реализация инкапсулирована в отдельную сущность,
	 * так как ее наличие требуется в нескольких участках исходного кода.
	 */
	function resetPenaltyPointsForGame() {

		penaltyPointsForGame = 0;

	}

	/**
	 * Обновляем ЛУЧШИЙ результат по очкам, в соответствиии с набранными
	 * очками по уроку.
	 */
	function updateBestScore() {

		that.bestScore = Math.max(that.currentScore, that.bestScore);

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
	 * полей по лучшим результатам и сброс текущих.
	 */
	function updateBestResults() {

		updateBestScore();
		updateBestRunCount();

		// Обновив ЛУЧШИЕ результаты урока, сбрасываем текущие, т.к. их значения
		// уже не потребуются в дальнейшем (достигнут конец урока).
		resetCurrentResults()

	}


	/**
	 * Сброс ТЕКУЩИХ результатов по уроку.
	 * Т.е. сбрасываются только те результаты, которые были набраны
	 * по ходу прохождения урока.
	 * Лучшие результаты НЕ изменяются!
	 */
	function resetCurrentResults() {

		that.currentScore = lessonPoints ? lessonPoints.totalPoints:
										   0;
		that.currentRunCount = 0;

	}

	/**
	 * Сброс ВСЕХ результатов по уроку.
	 * Текущие очки сбрасываются в значение, которое
	 * назначено по уроку (если очки самого урока имеются -> т.е. ссылка lessonPoints определена).
	 *
	 */
	function resetAllResults() {

		resetCurrentResults();

		that.bestScore = 0;
		that.bestRunCount = 0;

		resetPenaltyPointsForGame();

	}

	function restore(statistics) {

		if (statistics)
		{
			that.bestRunCount = statistics.bestRunCount;
			that.currentRunCount = statistics.currentRunCount;

			that.bestScore = statistics.bestScore;
			that.currentScore = statistics.currentScore;

		}

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

	function getLessonPoints() {

		return lessonPoints;

	}

	function setPenaltyPointsForGame(penaltyPoints) {

		penaltyPointsForGame = penaltyPoints;

	}

	function subPenaltyPointsForGame() {

		subCurrentScore(penaltyPointsForGame);

		// Сбрасываем значение штрафных очков за игру,
		// так как предполагается, что установленное значение отнимается СТРОГО 1 раз.
		resetPenaltyPointsForGame();

	}
}
