'use strict';

module.exports = FirstContactWithVariables();

/**
 * Created by vaimer on 31.01.17.
 */
function FirstContactWithVariables() {

	return {
		isRestartDisabled: true,
		title:        'Новое задание',
		character:    [{

			audio:  'audio/lesson2/1-2.mp3',
			css:    'astromen-img'
		}, {

			audio:  'audio/lesson2/1-2.mp3',
			css:    'astrogirl-img'

		}],

		content: content,

		defaultBBot: defaultBBot,

		instructions: '<ul>' +
					  '<li>Нажмите "Далее" для продолжения.</li>' +
					  '</ul>'
	};

	function content() {

		return '<p>Рад снова вас видеть кадет. Нам необходимо перевести датчик в исследовательский центр. ' +
			'Чтобы выполнить задание вам потребуется изучить некоторые возможности работы с информацией. Приступим.</p>' +
			'<p>Для хранения информации в <strong>JavaScript</strong> используются переменные. ' +
			'Что это такое? По сути это подписанные контейнеры, которые хранят различные значения.</p>' +
			'<p>Переменные объявляются, другими словами, создаются с помощью ключевого слова <span class="under-label">var</span>. ' +
			'После следует имя переменной, которое может состоять из букв, цифр, символов <strong>$</strong> и <strong>_</strong> , ' +
			'но не должно начинаться с цифры.</p>';

	}

	function defaultBBot() {

		return '<p>Проснись, кадет...</p>';

	}
}
