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
	 * Обновляем ЛУЧШИЙ результат по очкам (bestScore), в соответствиии с набранными
	 * очками по уроку (currentScore).
	 */
	function updateBestScore() {

		that.bestScore = Math.max(that.currentScore, that.bestScore);

	}

	/**
	 * Обновляем ЛУЧШЕЕ число запусков интерпретатора (bestRunCount), в соответствии с числом
	 * его запусков по уроку (currentRunCount).
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

			if (isUserHasMaxBestScoreForLesson()) {

				setUserCanGetBonusScore(false);

			}

		}
		else {

			checkForBonusScore();

		}

		// Сбрасываем текущие результаты по уроку, так как он был окончен.
		resetCurrentResults();

	}

	/**
	 * Подразумевает обновление лучших результатов
	 * опираясь на состояние полей:
	 * - currentScore;
	 * - currentRunCount.
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

		setUserCanGetBonusScore(true);

		resetPenaltyPointsForGame();

	}

	function restore(statistics) {

		if (statistics) {

			that.bestRunCount = statistics.bestRunCount;
			that.currentRunCount = statistics.currentRunCount;

			that.bestScore = statistics.bestScore;
			that.currentScore = statistics.currentScore;

			that.attemptLessonCount = statistics.attemptLessonCount;

			setUserCanGetBonusScore(statistics.isUserCanGetBonusScore);

		}

	}

	function incRunCount() {

		that.currentRunCount++;

	}

	/**
	 * Метод возвращает число возможных бонусных очков, которые
	 * может получить пользователь.
	 */
	function calculateBonusScore() {

		// Разница между максимально возможными очками за урок и текущим
		// лучшим результатом.
		var difference = lessonPoints.totalPoints - that.bestScore;

		// Пока что просто условились на том, что бонусные очки это есть
		// "разница" (между максимально возможными очками за урок и текущим лучшим результатом) пополам.
		// Также, не забываем устанавливать точность результата, чтобы избежать
		// непредставимых чисел. 2 знака после запятой для результатов самое оптимальное :)
		return Number((difference / 2).toFixed(2));

	}

	/**
	 * Метод проверки - достиг ли пользотваель предельного числа прохождения
	 * урока для получения бонуса.
	 *
	 * @return boolean true пользователь превысил число попыток прохждения урока
	 * 						для получения бонуса;
	 * 				   false пользователь не превысил число попыток прохождения.
	 */
	function isUserHasExceededAttemptOnBonusScore() {

		return that.attemptLessonCount > maxAttemptLessonCountForBonus;

	}

	/**
	 * Метод сообщает - достиг ли пользователь максимальных очков в ЛУЧШЕМ (that.bestScore)
	 * своем результате по уроку.
	 *
	 * @return boolean true у пользователя максимальное число очков в лучшем результате.
	 * 		   		   false пользователь не достиг максимума в лучщем результате.
	 */
	function isUserHasMaxBestScoreForLesson() {

		return that.bestScore === lessonPoints.totalPoints;

	}

	/**
	 * Метод сообщает - достиг ли пользователь максимальных очков в ТЕКУЩЕМ (that.currentScore)
	 * результате по уроку.
	 *
	 * @return boolean true у пользователя максимальное число очков в текущем результате.
	 * 		   		   false пользователь не достиг максимума в текущем результате.
	 */
	function isUserHasMaxCurrentScoreForLesson() {

		return lessonPoints.totalPoints === that.currentScore;

	}

	/**
	 * Необходимо понимать, что в метод addBonusScore мы попадаем,
	 * когда в that.CurrentScore находится максимум очков по уроку!
	 * Это логика работы нашего алгоритма зачисления бонусных очков
	 * (пользователь может получить бонусы только тогда, когда заработает
	 * максимальное количество очков за урок).
	 * Поэтому, дабы updateBestResults обновлял лучшие результаты только на основании
	 * бонусных очков (бонус в данном случае - это есть сложение самого бонуса с прошлым лучшим
	 * результатом) необходимо that.currentScore установить сперва именно в это значение (значение бонуса).
	 * А затем, возвращаем значение that.сurrentScore в первоначальное состояние.
	 */
	function addBonusScore(bonusScore) {

		var currentScore = that.currentScore;

		that.currentScore = that.bestScore + bonusScore;

		// Обновляем лучшие результаты, в связи с начислением бонусов.
		updateBestResults();

		that.currentScore = currentScore;

	}

	/**
	 * Метод проверки возможности зачисления бонусных очков пользователю за урок.
	 * Если такая возможность имеется - метод зачисляет бонусные очки пользователю.
	 * Для зачисления бонусных очков - необходимо выполнение ряда условий. Их проверка
	 * также возлагается на данный метод.
	 * Кроме того, данный метод учитывает, что бонусные очки пользователь может получать
	 * только 1 раз.
	 * Также, метод берет на себя ответственность за установку запрета получения пользователем
	 * бонусных очков при достижении им максимального числа попыток прохождения урока.
	 */
	function checkForBonusScore() {

		// Если пользователь может получать бонусные очки.
		if ( that.isUserCanGetBonusScore ) {

			// Проверяем, получил ли пользователь максимум очков по текущим результатам за урок.
			// По текущему соглашению - пользователь имеет право на бонусы только
			// в случае прохождения урока на максимальный результат.
			if (isUserHasMaxCurrentScoreForLesson()) {

				var bonusScore = calculateBonusScore();

				addBonusScore(bonusScore);

				// Пользователь больше не может получать бонусные очки.
				setUserCanGetBonusScore(false);

			}

			// Также, не забываем о проверке на последнюю
			// попытку получения бонусов.
			if (isUserHasExceededAttemptOnBonusScore()) {

				// Пользователь больше не может получать бонусные очки.
				setUserCanGetBonusScore(false);

			}
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

	function setUserCanGetBonusScore(isUserCanGetBonusScore) {

		that.isUserCanGetBonusScore = isUserCanGetBonusScore;

	}

	function subPenaltyPointsForGame() {

		subCurrentScore(penaltyPointsForGame);

		// Сбрасываем значение штрафных очков за игру,
		// так как предполагается, что установленное значение отнимается СТРОГО 1 раз.
		resetPenaltyPointsForGame();

	}
}
