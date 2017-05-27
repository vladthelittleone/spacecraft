'use strict';

// Экспорт
module.exports = Content();

/**
 * @author Aleksandrov Oleg
 * @since 26.05.17
 */
function Content() {

	var points = {
		totalPoints: 280,
		// Штрафные очки за действия на уроке.
		incorrectAnswer: 40
	};

	return {
		text:                          'Тестирование 2',
		label:                         'Основы JavaScript',
		quote:                         'Новые горизонты, новые вопросы.',
		sub:                           require('./sub'),
		points:                        points,
		maxAttemptLessonCountForBonus: 3
	};

}
