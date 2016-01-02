'use strict';

/**
 * Created by Ivan on 02.01.2016.
 */
var app = angular.module('spacecraft.lessonProvider', []);

app.service('lessonProvider', function ()
{
	var lessons =
	[
		{
			text: 'Поступление в академию',
			label: 'Основы JavaScript',
			quote: 'Знания свет — путь укажет нам',
			startCode: '',
			sub:
			[
				{
					title: 'Добро пожаловать в академию!',
					content:
					'<p>Прежде, для управления кораблем требовалась целая команда специалистов, однако это ' +
					'время прошло, теперь достаточно одного пилота-инженера.</p>' +
					'<p>Наша академию выпускает лучших пилотов во всей галактике, когда-нибудь и Вы, сможете стать одним из них.</p>' +
					'<p>Прежде чем начать обучение, необходимо уладить некоторые формальности.</p>',
					instructions:
					'<ul>' +
					'<li>Справа находится редактор кода - это инструмент с помощью которого вы выполняете поставленные задачи.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Редактор кода',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						}
					],
					result: ''
				},
				{
					title: 'Добро пожаловать в академию SpaceCraft!',
					content:
					'<p>Введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
					'<p>Высылаю вам инструкции по выполнению.</p>',
					instructions:
					'<ul>' +
					'<li>Справа находится редактор кода - это инструмент с помощью которого вы выполняете поставленные задачи.</li>' +
					'<li>Введите свое имя в кавычках, к примеру для меня код будет выглядеть так: <span class="red-label">«Джайна»</span>.</li>' +
					'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Редактор кода',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_active-line': 'Введите свое имя в формате: "Имя"',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .play-toggle .green': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода, а <i class="glyphicon glyphicon-stop red"></i> для вызова паузы',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						}
					],
					result: ''
				}
			]
		}
	];

	return function (num)
	{
		return lessons[num];
	}
});
