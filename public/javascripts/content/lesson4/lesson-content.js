'use strict';

// Экспорт
module.exports = Content();

/**
 * Контент третьего урока.
 *
 * Created by vladthelittleone on 12.06.16.
 */
function Content() {

	var points = {
		// Штрафные очки за действия на уроке.
		incorrectAnswer: 50
	};

	return {
		text:                          'Тестирование',
		label:                         'Основы JavaScript',
		quote:                         'Новые горизонты, новые вопросы.',
		sub:                           require('./sub'),
		points:                        points,
		maxAttemptLessonCountForBonus: 3
	};

}
