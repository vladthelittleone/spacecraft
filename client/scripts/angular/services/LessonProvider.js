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
					botText: {
						default: '### Дройд BBot - инициализация...',
					},
					content:
					'<p>Прежде, для управления космическим кораблем требовалась целая команда специалистов, однако это ' +
					'время прошло, теперь достаточно одного пилота-инженера.</p>' +
					'<p>Наша академия выпускает лучших пилотов во всей галактике, когда-нибудь и Вы, сможете стать одним из них.</p>' +
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
						},
						{
							'click .enjoy-hint-next': 'Нажмите для перехода к следующему уроку',
							'nextButton': false,
							'showSkip': false
						}
					]
				},
				{
					title: 'Ваше имя?',
					botText:
					{
						success: function(value)
						{
							return '<p>### Ура BBot понял челвек0-имя, транслирую:</p>'
								+ '<p>' + value + '</p>';
						},
						error: function()
						{
							return '<p>### Упс! BBot не разобрал ваше человеческ0е имя!</p>' +
								'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>';
						}
					},
					content:
					'<p>Так, новенький, введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
					'<p>Высылаю вам инструкции по выполнению.</p>',
					instructions:
					'<ul>' +
					'<li>Введите свое имя в кавычках, к примеру для меня код будет выглядеть так: <span class="red-label">«Джайна»</span>.</li>' +
					'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите свое имя в кавычках',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .play-toggle .green': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода, а <i class="glyphicon glyphicon-stop red"></i> для вызова паузы',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						function isNumeric(n)
						{
							return !isNaN(parseFloat(n)) && isFinite(n);
						}

						if (value)
						{
							// Если нет " ", будет выброшено исключение
							if (value.exception)
							{
								return false;
							}

							// Если введено число, то результат отрицательный
							if (isNumeric(value))
							{
								return false;
							}

							// "Ваше имя" - регулярка направлена
							// на поиск имени в скобках.
							var reg = new RegExp('(.+).*');
							return reg.test(value);
						}

						return false;
					}
				}
			]
		}
	];

	return function (num)
	{
		return lessons[num];
	}
});
