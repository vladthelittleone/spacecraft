'use strict';

/**
 * Created by Ivan on 02.01.2016.
 */
var app = angular.module('spacecraft.lessonProvider', []);

app.service('lessonProvider', function ()
{
	function isNumeric(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

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
						default: '### Дройд BBot - инициализация...'
					},
					content:
					'<p>Прежде, для управления космическим кораблем требовалась целая команда специалистов, однако это ' +
					'время прошло, теперь достаточно одного пилота-инженера.</p>' +
					'<p>Наша академия выпускает лучших пилотов во всей галактике, когда-нибудь и Вы, сможете стать одним из них.</p>' +
					'<p>Прежде чем начать обучение, необходимо уладить некоторые формальности.</p>',
					instructions:
					'<ul>' +
					'<li>Справа находится редактор кода - это инструмент с помощью которого вы выполняете поставленные задачи.</li>' +
					'<li>Справа внизу находится робот - компаньон BBot. Он покажет ошибки и выведет всю необходимую информацию.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Редактор кода',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .bbot-img': 'Bob Bot - ваш помощник',
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
							return '<p>### Ура! BBot понял челвек0-имя, транслирую:</p>'
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
				},
				{
					title: 'Галактическая единица',
					botText:
					{
						success: function(value)
						{
							return '<p>### Уря! BBot понял челвек0-в0звраст, транслирую:</p>'
								+ '<p>' + value + 'GY</p>';
						},
						error: function()
						{
							return '<p>### Упс! BBot не разобрал ваш человеческий в0звраст!</p>' +
								'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>';
						}
					},
					content:
					'<p>Отлично кадет «Имя», я нашла вас в списках.</p>' +
					'<p>Нам нужно уладить еще пару ненужных бюрократических моментов.</p>' +
					'<p>Введите свой возраст в галактической единице измерения времени - <strong>GY</strong>.</p>',
					instructions:
					'<ul>' +
					'<li>Введите свой возраст и поделите на 250 (является периодом вращения систем вокруг центра нашей галактики в млн. лет).</li>' +
					'<li>Для деления используется оператор <span class="red-label">/</span>. ' +
						'Так же вы можете использовать <span class="red-label">+</span>, ' +
						'<span class="red-label">-</span>, <span class="red-label">*</span> ' +
						'для сложения, вычитания, умножения соответственно.</li>' +
					'<li>Например: <span class="red-label">21 / 250</span></li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите свой возраст в GY',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .play-toggle .green': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						if (value)
						{
							if (value.exception)
							{
								return false;
							}

							// Если выведено число, то результат положительный
							return isNumeric(value);
						}

						return false;
					}
				},
				{
					title: 'В4К',
					botText:
					{
						success: function(value)
						{
							return '<p>### 0шибка найдена! 0шибка найдена! Транслирую:</p>' +
								'<p>' + value.message + '</p>';
						},
						error: function()
						{
							return '<p>### Что-т0 не так! BBot не видит 0шибок! Где же они?</p>' +
								'<p>### Ст0ит еще раз про4итатb инструкции и попроб0вать снова.</p>';
						}
					},
					content:
					'<p>Отлично! Теперь перейдем к действительно важным вещам.</p>' +
					'<p><strong>В4К</strong> (консоль ввода кода космического корабля) - это новая система интерпретации, которая находится на стадии тестирования и уже используется в академии.</p>' +
					'<p>Вам нужно проверить работоспособность В4К, а мы, в свою очередь, проверим ваши способности в космической инженерии.</p>'+
					'<p>В4К распознает язык программирования <strong>JavaScript</strong>. Если использовать слова, не входящие в этот язык, то система должна сообщить об ошибке. Проверим!</p>',
					instructions:
					'<ul>' +
					'<li>Введите в интерпретатор В4К слово, не входящее в язык программирования JavaScript.</li>' +
					'<li>Например: <span class="red-label">BBotTheBest</span></li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите слово, не входящее в JavaScript.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .play-toggle .green': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						if (value)
						{
							// Должно быть выброшено исключение
							return value.exception;
						}

						return false;
					}
				},
				{
					title: 'Комментарии',
					botText:
					{
						success: function()
						{
							return '<p>### Что-т0 преднозначенн0е для чел0века! Комментарии?</p>';
						},
						error: function()
						{
							return '<p>### Ой! Что-т0 не так! BBot не нашел к0мментарий!</p>' +
								'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>';
						}
					},
					content:
					'<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, идем дальше.</p>' +
					'<p>В В4К есть поддержка комментариев JavaScript. Комментарии начинаются с <strong>//</strong> и предназначены только для человека.</p>' +
					'<p>Комментарии делают ваш код более понятным для вас и вашей команды. Поэтому, если вдруг ваш корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>',
					instructions:
					'<ul>' +
					'<li>Закомментируйте кусок кода в строке 1.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Закомментируйте данный код',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .play-toggle .green': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						// При комментировании результат будет возвращен ввиде 'undefined'
						return !value;
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
