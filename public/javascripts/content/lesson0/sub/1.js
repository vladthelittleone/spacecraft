'use strict';

module.exports = WelcomeToAcademy();

/**
 * Урок - 'Добро пожаловать в академию!';
 *
 * Created by vladthelittleone on 02.12.15.
 */
function WelcomeToAcademy() {

	return {
		title:        'Добро пожаловать в академию!',
		defaultBBot:  function () {

			return '<p>Дройд BBot - инициализация...</p>' +
				'<p>Настройка юм0ра на 75%</p>' +
				'<p>Самоуничтожение через 10... 9... 8... 7...</p>'

		},
		content:      function () {

			return '<p>Прежде, для управления космическим кораблем требовалась целая команда специалистов, однако это ' +
				'время прошло, теперь достаточно одного пилота-инженера.</p>' +
				'<p>Наша академия выпускает лучших пилотов во всей галактике, когда-нибудь и Вы, сможете стать одним из них.</p>' +
				'<p>Что ж хватит с меня нотаций. Сержант! Доведите инструкции до поступающих!</p>'

		},
		instructions: '<ul>' +
					  '<li>Справа находится редактор кода - это инструмент, с помощью которого вы выполняете поставленные задачи.</li>' +
					  '<li>Справа внизу находится робот - компаньон BBot. Он покажет ошибки и выведет всю необходимую информацию.</li>' +
					  '<li>Правее находится панель управления, с помощью которой вы сможете управлять записями, запускать код и вывести текстовый материал.</li>' +
					  '<li>Нажмите "Далее" для продолжения.</li>' +
					  '</ul>',
		character:    [{
			audio: 'audio/lesson1/1.mp3',
			css:   'astromen-img'
		}, {
			audio: 'audio/lesson1/2.mp3',
			css:   'astrogirl-img'
		}, {
			audio: 'audio/lesson1/3.mp3',
			css:   'astrogirl-img',
			hint:  [
				{
					'next .ace_scroller': 'Редактор кода',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			]
		}, {
			audio: 'audio/lesson1/4.mp3',
			css:   'astrogirl-img',
			hint:  [
				{
					'next .bbot-img': 'Bob Bot - ваш помощник',
					'nextButton':     {text: 'Далее'},
					'showSkip':       false
				}
			]
		}, {
			audio: 'audio/lesson1/5.mp3',
			css:   'astrogirl-img',
			hint:  [
				{
					'next .right-toolbar': 'Панель управления',
					'nextButton':          {text: 'Далее'},
					'showSkip':            false
				}
			]
		}, {
			audio:       'audio/lesson1/6.mp3',
			css:         'astrogirl-img',
			waitForHint: true,
			hint:        [{
				'click .enjoy-hint-next': 'Нажмите для перехода к следующему уроку',
				'nextButton':             false,
				'showSkip':               false
			}]
		}]
	};
}
