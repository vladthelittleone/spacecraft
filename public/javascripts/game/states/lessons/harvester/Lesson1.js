/**
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
var Lesson1 = function (st)
{
	function isNumeric(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	return {
		text: 'Первый урок',
		label: 'Введение в JavaScript',
		quote: 'Преодоление трудного начинается с легкого',
		startCode: '',
		sub: [
			{
				title: 'Программа академии',
				defaultBBot: function () {
					return '<p>Дройд BBot - инициализация...</p>' +
						'<p>Настройка юм0ра на 75%</p>' +
						'<p>Самоуничтожение через 10... 9... 8... 7...</p>'
				},
				content: function ()
				{
					return '<p>Приятно вас видеть, кадет!</p>' +
						'<p>Сегодня вам будет предоставлен первый урок программы подготовки пилота-инженера.</p>' +
						'<p>Программы, направленной на выпуск настоящих профессионалов, которые будут готовы выполнять поставленные задачи в любой части вселенной.</p>'
				},
				instructions: '<ul>' +
				'<li>Нажмите "Далее" для продолжения.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/1.mp3',
						css: 'astromen-img'
					},
					{
						audio: 'audio/lesson1/2.mp3',
						css: 'astrogirl-img'
					},
					{
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						]
					},
					{
						audio: 'audio/lesson1/4.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .bbot-img': 'Bob Bot - ваш помощник',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						]
					},
					{
						audio: 'audio/lesson1/5.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .lesson-toolbar': 'Панель указаний',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						]
					},
					{
						audio: 'audio/lesson1/6.mp3',
						css: 'astrogirl-img',
						waitForHint: true,
						hint: [
							{
								'click .enjoy-hint-next': 'Нажмите для перехода к следующему уроку',
								'nextButton': false,
								'showSkip': false
							}
						]
					}
				]
			}
		]
	};
};
