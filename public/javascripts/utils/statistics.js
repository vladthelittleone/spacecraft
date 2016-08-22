'use strict';

module.exports = Statistics;

/**
 * Сервис хранения статистики пользователя по игре.
 *
 * Created by Ivan on 10.11.2015.
 */
function Statistics ()  {

	// Начальное значение поля финального результата по уроку.
	// Необходимо для отлова ситуации, когда для пользователя еще
	// не рассчитывался его финальный показатель по уроку.
	var INITIAL_FINAL_SCORE_VALUE = -1;

	var lessonPoints;

	var maxAttemptLessonCountForBonus;

	var penaltyPointsForGame;

	// Общее число бонусных очков, которые были начислены.
	var bonusScore;

	var that = {};

	// Инициализируем начальное значение параметров статистики.
	resetAllResults();

	that.initialize = initialize;

	that.reset = resetAllResults;
	that.resetCurrentResults = resetCurrentResults;

	that.incRunCount = incRunCount;
	that.incAttemptLessonCount = incAttemptLessonCount;

	that.subPointsForException = subPointsForException;
	that.subPointsForIncorrectInput = subPointsForIncorrectInput;
	that.subCurrentScore = subCurrentScore;
	that.subPenaltyPointsForGame = subPenaltyPointsForGame;

	that.tryAddBonusScore = tryAddBonusScore;

	that.getLessonPoints = getLessonPoints;
	that.getMaxLimitScoreForLesson = getMaxLimitScoreForLesson;
	that.getCurrentScore = getCurrentScore;
	that.getAttemptCountForBonus = getAttemptCountForBonus;
	that.getFinalScore = getFinalScore;
	that.getBonusScore = getBonusScore;
	that.getBonusScore = getBonusScore;

	that.isItFirstLessonAttempt = isItFirstLessonAttempt;
	that.isUserHasMaxFinalScoreForLesson = isUserHasMaxFinalScoreForLesson;
	that.isFinalScoreInitialized = isFinalScoreInitialized;

	that.setPenaltyPointsForGame = setPenaltyPointsForGame;

	that.calculateScoreForLessonEnd = calculateScoreForLessonEnd;
	that.calculateBonusScore = calculateBonusScore;


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
	 * К примеру, в разметке шаблона окончания урока, понадобился способ
	 * узнавать - является ли текущая попытка прохождения урока первой.
	 * Для улучшения восприятия кода, и избавления себя от привязок
	 * к именам полей статистики, было решено завести отдельный метод,
	 * который бы отвечал на этот вопрос результатом своего вызова.
	 * Безусловно - можно было бы строго возращать число прохождений
	 * и сравнивать его с 1.
	 * Но как мне кажется, читаемость кода будет более приоритетней :)
	 */
	function isItFirstLessonAttempt() {

		return that.attemptLessonCount === 1;

	}

	/**
	 * Метод получения числа максимально возможных очков, которые можно
	 * получить за урок.
     */
	function getMaxLimitScoreForLesson() {

		return lessonPoints.totalPoints;

	}

	/**
	 * Возвращает финальный результат по уроку.
	 */
	function getFinalScore() {

		return that.finalScore;

	}

	/**
	 * Возвращает значение бонусных очков, которые были зачислены
	 * с момента последнего обращения к этому методу.
	 * Иногда необходимо узнать - сколько же всего в сумме были зачисленно бонусных очков.
	 * При этом, при следущем обращении - уже нет необходимости знать предыдущий результат.
	 * Именну эта задачу и решает данный метод.
	 * @return {number} 0 в случае отсутствия бонусных очков.
     */
	function getBonusScore() {

		return bonusScore;

	}

	/**
	 * Возвращает оставшееся число попыток прохождения урока для получения бонуса.
	 * Не забываем, что в maxAttemptLessonCountForBonus хранится количество
	 * прохождений именно для получения бонуса.
	 * А первое прохождение урока не связано с получением бонуса.
	 * Поэтому, в переменной currentAttemptForBonusOnly мы храним
	 * число попыток прохождения урока именно для получения бонуса :)
     */
	function getAttemptCountForBonus() {

		var currentAttemptForBonusOnly = that.attemptLessonCount - 1;

		return maxAttemptLessonCountForBonus - currentAttemptForBonusOnly;

	}

	/**
	 * Метод получения текущих очков по уроку.
     */
	function getCurrentScore() {

		return that.currentScore;

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
	 * Метод сброса бонусных очков по игре.
	 * Реализация инкапсулирована в отдельную сущность,
	 * так как ее наличие требуется в нескольких участках исходного кода.
	 */
	function resetBonusScore() {

		bonusScore = 0;

	}

	/**
	 * Обновляем ФИНАЛЬНОЕ число запусков интерпретатора (finalRunCount), в соответствии с числом
	 * его запусков по уроку (currentRunCount).
	 * Обновляем ФИНАЛЬНЫЙ результат по очкам (finalScore), в соответствиии с набранными
	 * очками по уроку (currentScore).
	 */
	function updateFinalScore() {

		that.finalScore = Math.max(that.currentScore, that.finalScore);

	}

	/**
	 * Обновляем ФИНАЛЬНОЕ число запусков интерпретатора (finalRunCount), в соответствии с числом
	 * его запусков по уроку (currentRunCount).
	 */
	function updateFinalRunCount() {

		if (!that.finalRunCount) {

			// Мы еще не имеем финального результата.
			// Поэтому текущий результат и есть финальный.
			that.finalRunCount = that.currentRunCount;

		}
		else {

			// Нужно не забывать, что именно НАИМЕНЬШЕЕ число
			// запусков интерпретатора будет считаться ФИНАЛЬНЫМ.
			that.finalRunCount = Math.min(that.currentRunCount, that.finalRunCount);

		}

	}

	/**
	 * Метод обновление текущих очков за урок по окончанию урока.
	 * Метод включает логику вызова метода начисления бонусных очков, а также
	 * фиксирования финальных показателей по уроку за первую попытку прохождения.
	 */
	function calculateScoreForLessonEnd() {

		// Если финальный результат по уроку еще НЕ рассчитывался.
		if (!isFinalScoreInitialized()) {

			updateFinalResults();

			if (isUserHasMaxFinalScoreForLesson()) {

				setUserCanGetBonusScore(false);

			}

		}
		else {

			tryAddBonusScore();

		}

	}

	/**
	 * Подразумевает обновление финальных результатов
	 * опираясь на состояние полей:
	 * - currentScore;
	 * - currentRunCount.
	 */
	function updateFinalResults() {

		updateFinalScore();
		updateFinalRunCount();

	}


	/**
	 * Сброс ТЕКУЩИХ результатов по уроку.
	 * Т.е. сбрасываются только те результаты, которые были набраны
	 * по ходу прохождения урока.
	 * Финальные результаты НЕ изменяются!
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

		// Финальный результат по очкам за урок.
		that.finalScore = INITIAL_FINAL_SCORE_VALUE;

		// Финальное число запуска кода пользователем за урок.
		that.finalRunCount = 0;

		// Число попыток прохождения урока.
		that.attemptLessonCount = 0;

		setUserCanGetBonusScore(true);

		resetPenaltyPointsForGame();


		resetBonusScore();

	}

	function restore(statistics) {

		if (statistics) {

			that.finalRunCount = statistics.finalRunCount;
			that.currentRunCount = statistics.currentRunCount;

			that.finalScore = statistics.finalScore;
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
		var difference = lessonPoints.totalPoints - that.finalScore;

		// Пока что просто условились на том, что бонусные очки это есть
		// "разница" (между максимально возможными очками за урок и текущим лучшим результатом) пополам.
		return parseInt(difference / 2);

	}

	/**
	 * Метод проверки - была ли уже выполнена первая расчет очков урока.
	 *
	 * @return boolean true первый расчет был;
	 * 				   false первого расчета не было.
	 */
	function isFinalScoreInitialized() {

		return that.finalScore !== INITIAL_FINAL_SCORE_VALUE;

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
	 * Метод сообщает - достиг ли пользователь максимальных очков в ФИНАЛЬНОМ (that.finalScore)
	 * своем результате по уроку.
	 *
	 * @return boolean true у пользователя максимальное число очков в финальном результате.
	 * 		   		   false пользователь не достиг максимума в лучщем результате.
	 */
	function isUserHasMaxFinalScoreForLesson() {

		return that.finalScore === getMaxLimitScoreForLesson();

	}

	/**
	 * Метод сообщает - достиг ли пользователь максимальных очков в ТЕКУЩЕМ (that.currentScore)
	 * результате по уроку.
	 *
	 * @return boolean true у пользователя максимальное число очков в текущем результате.
	 * 		   		   false пользователь не достиг максимума в текущем результате.
	 */
	function isUserHasMaxCurrentScoreForLesson() {

		return getMaxLimitScoreForLesson() === that.currentScore;

	}

	/**
	 * Метод добавления дополнительных очков к лучшему результату.
     */
	function addToFinalScore(value) {

		that.finalScore = that.finalScore + value;

	}

	/**
	 * Метод попытки зачисления бонусных очков пользователю за урок.
	 * Если такая возможность имеется - метод зачисляет бонусные очки пользователю.
	 * Для зачисления бонусных очков - необходимо выполнение ряда условий. Их проверка
	 * возлагается на данный метод.
	 * Кроме того, данный метод учитывает, что бонусные очки пользователь может получать
	 * только 1 раз.
	 * Также, метод берет на себя ответственность за установку запрета получения пользователем
	 * бонусных очков при достижении им максимального числа попыток прохождения урока.
	 */
	function tryAddBonusScore() {

		// Если пользователь может получать бонусные очки.
		if ( that.isUserCanGetBonusScore ) {

			// Проверяем, получил ли пользователь максимум очков по текущим результатам за урок.
			// По текущему соглашению - пользователь имеет право на бонусы только
			// в случае прохождения урока на максимальный результат.
			if (isUserHasMaxCurrentScoreForLesson()) {

				// Запоминаем бонусные очки для текущего урока.
				bonusScore = calculateBonusScore();

				addToFinalScore(bonusScore);

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

	/**
	 * Предполагается, что данный метод устанавливает штрафные очки
	 * за урок, которые в последующем будут сняты методом subPenaltyPointsForGame.
     */
	function setPenaltyPointsForGame(penaltyPoints) {

		penaltyPointsForGame = penaltyPoints;

	}

	function setUserCanGetBonusScore(isUserCanGetBonusScore) {

		that.isUserCanGetBonusScore = isUserCanGetBonusScore;

	}

	/**
	 * Снимает штрафные очки, которые были установлены
	 * последним вызовом setPenaltyPointsForGame.
	 * В последующем, метод сбрасывает текущие штрафные очки,
	 * так как предполагается, что они отнимаются строго 1 раз.
	 */
	function subPenaltyPointsForGame() {

		subCurrentScore(penaltyPointsForGame);

		resetPenaltyPointsForGame();

	}
}
