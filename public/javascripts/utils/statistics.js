'use strict';

module.exports = Statistics;

/**
 * Сервис хранения статистики пользователя по игре.
 *
 * Created by Ivan on 10.11.2015.
 */
function Statistics ()  {

	// Начальное значение поля лучшего результата по уроку.
	// Необходимо для отлова ситуации, когда для пользователя еще
	// не рассчитывался его лучший показатель по уроку.
	var INITIAL_BEST_SCORE_VALUE = -1;

	var lessonPoints;

	var maxAttemptLessonCountForBonus;

	var penaltyPointsForGame = 0;

	var that = {};

	// Инициализируем начальное значение параметров статистики.
	resetAllResults();

	that.initialize = initialize;
	that.reset = resetAllResults;
	that.incRunCount = incRunCount;
	that.incAttemptLessonCount = incAttemptLessonCount;
	that.subPointsForException = subPointsForException;
	that.subPointsForIncorrectInput = subPointsForIncorrectInput;
	that.getLessonPoints = getLessonPoints;
	that.subCurrentScore = subCurrentScore;
	that.setPenaltyPointsForGame = setPenaltyPointsForGame;
	that.subPenaltyPointsForGame = subPenaltyPointsForGame;
	that.checkForBonusPoints = checkForBonusScore;
	that.calculateScoreForLessonEnd = calculateScoreForLessonEnd;

	return that;


	function initialize(lessonContent, ctx) {

		lessonPoints = lessonContent.points;
		maxAttemptLessonCountForBonus = lessonContent.maxAttemptLessonCountForBonus;

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
	 * Метод обновление текущих очков за урок по окончанию урока.
	 * Метод включает логику вызова метода начисления бонусных очков, а также
	 * фиксирования лучших показателей по уроку за первую попытку прохождения.
	 */
	function calculateScoreForLessonEnd() {

		// Если лучший результат по уроку еще НЕ рассчитывался.
		if ( that.bestScore === INITIAL_BEST_SCORE_VALUE ) {

			updateBestResults();

			checkForUserGetMaxScoreForLesson();

		}
		else {

			checkForBonusScore();

		}

		// Сбрасываем текущие результаты по уроку, так как он был окончен.
		resetCurrentResults();

	}

	/**
	 * Подразумевает обновление всех имеющихся
	 * полей по лучшим результатам.
	 */
	function updateBestResults() {

		updateBestScore();
		updateBestRunCount();

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
	 * Также сбрасываем число прохождений урока.
	 *
	 */
	function resetAllResults() {

		resetCurrentResults();

		// Лучший результат по очкам за урок.
		that.bestScore = INITIAL_BEST_SCORE_VALUE;

		// Лучшее число запуска кода пользователем за урок.
		that.bestRunCount = 0;

		// Число попыток прохождения урока.
		that.attemptLessonCount = 0;

		that.isUserCanGetBonusScore = true;

		resetPenaltyPointsForGame();

	}

	function restore(statistics) {

		if (statistics) {

			that.bestRunCount = statistics.bestRunCount;
			that.currentRunCount = statistics.currentRunCount;

			that.bestScore = statistics.bestScore;
			that.currentScore = statistics.currentScore;

			that.attemptLessonCount = statistics.attemptLessonCount;

			that.isUserCanGetBonusScore = statistics.isUserCanGetBonusScore;

		}

	}

	function incRunCount() {

		that.currentRunCount++;

	}

	/**
	 * Начисление бонусов предполагает изменение состояния
	 * currentScore, чтобы  в последующем, метод updateBestResutls
	 * корректно обновил лучшие результаты (в currentScore должны лежать очки,
	 * которые установят новое значение bestScore, с учетом бонусных начислений).
	 */
	function calculateBonusScore() {

		// Устаналиваем текущие очки в прошлый лучший результат, чтобы
		// затем к ним прибавить бонусы.
		that.currentScore = that.bestScore;

		var difference = lessonPoints.totalPoints - that.currentScore;

		// Пока что просто условились на том, что бонусные очки это есть
		// "разница" (между максимально возможными очками за урок и текущим лучшим результатом) пополам.
		// Также, не забываем устанавливать точность результата, чтобы избежать
		// непредставимых чисел. 2 знака после запятой для результатов самое оптимальное :)
		var bonusScore = Number((difference / 2).toFixed(2));

		that.currentScore = that.currentScore + bonusScore;

		// Пользователь больше не может получать бонусные очки.
		that.isUserCanGetBonusScore = false;

		// Обновляем лучшие результаты, в связи с начислением бонусов.
		updateBestResults();

	}

	/**
	 * Метод проверки и обработки на достижение пользователем последней попытки
	 * получения бонусных очков.
	 */
	function checkForLastAttemptOnBonusScore() {

		var isUserExceededMaxAttemptCountForBonus = ( that.attemptLessonCount ) >
													maxAttemptLessonCountForBonus;

		if (isUserExceededMaxAttemptCountForBonus) {

			that.isUserCanGetBonusScore = false;

		}

	}

	/**
	 * Метод осуществляет проверку - а нуждается ли пользователь в принципе в каких-либо
	 * бонусных очках.
	 * Состоние флага isUserCanGetBonusScore должно быть актуальным.
	 * Ведь именно на этот флаг мы опираемся перед какими-либо вычислениями для бонусов.
	 */
	function checkForUserGetMaxScoreForLesson() {

		// Нуждается ли пользователь в каких либо бонусных очках.
		var isNeededInBonusScore = that.bestScore < lessonPoints.totalPoints;

		if (!isNeededInBonusScore) {

			that.isUserCanGetBonusScore = false;

		}
		
	}

	/**
	 * Метод начисления бонусных очков пользователю, если это возможно.
	 */
	function checkForBonusScore() {

		// Если пользователь может получать бонусные очки.
		if ( that.isUserCanGetBonusScore ) {

			// Проверяем, получил ли пользотваель максимум очков по уроку.
			// По текущему соглашению - пользователь имеет право на бонусы только
			// в случае прохождения урока на максимальный результат.
			var isUserGetMaxScoreForCurrentLesson = !(lessonPoints.totalPoints - that.currentScore);

			if (isUserGetMaxScoreForCurrentLesson) {

				calculateBonusScore();

			}

			// Также, не забываем о проверке на последнюю
			// попытку получения бонусов.
			checkForLastAttemptOnBonusScore();
		}

	}

	/**
	 * Увеличиваем число попыток прохождений урока.
	 */
	function incAttemptLessonCount() {

		that.attemptLessonCount++;

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
