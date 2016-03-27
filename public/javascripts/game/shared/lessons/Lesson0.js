/**
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
var Lesson0 = function (st)
{
	function isNumeric(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	return {
		text: 'Поступление в академию',
		label: 'Основы JavaScript',
		quote: 'Знания свет — путь укажет нам',
		startCode: '',
		sub: [
			{
				title: 'Добро пожаловать в академию!',
				defaultBBot: function () {
					return '<p>Дройд BBot - инициализация...</p>' +
						'<p>Настройка юм0ра на 75%</p>' +
						'<p>Самоуничтожение через 10... 9... 8... 7...</p>'
				},
				content: function ()
				{
					return '<p>Прежде, для управления космическим кораблем требовалась целая команда специалистов, однако это ' +
						'время прошло, теперь достаточно одного пилота-инженера.</p>' +
						'<p>Наша академия выпускает лучших пилотов во всей галактике, когда-нибудь и Вы, сможете стать одним из них.</p>' +
						'<p>Что ж хватит с меня нотаций. Сержант! Доведите инструкции до поступающих!</p>'
				},
				instructions: '<ul>' +
				'<li>Справа находится редактор кода - это инструмент, с помощью которого вы выполняете поставленные задачи.</li>' +
				'<li>Справа внизу находится робот - компаньон BBot. Он покажет ошибки и выведет всю необходимую информацию.</li>' +
				'<li>Левее находится панель указаний, с помощью которой вы сможете управлять записями и вывести текстовый материал.</li>' +
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
			},
			{
				title: 'Ваше имя?',
				content: function ()
				{
					return '<p>Так, новенький, нам нужно уладить еще пару ненужных бюрократических моментов.</p>' +
						'<p>Введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
						'<p>Высылаю вам инструкции по выполнению.</p>'
				},
				instructions: '<ul>' +
				'<li>Введите свое имя в кавычках, к примеру для меня код будет выглядеть так: <span class="red-label">"Нилар"</span>.</li>' +
				'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/1-1.mp3',
						css: 'astromen-img',
						hint: [
							{
								'next .ace_scroller': 'Введите свое имя в кавычках',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						]
					},
					{
						audio: 'audio/lesson1/1-2.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'click .lesson-alt-hint': 'Нажмите для получения инструкций',
								'nextButton': false,
								'showSkip': false
							}
						]
					}
				],
				result: function (value)
				{
					var botText = BBotText(
						{
							correct: '<p>Ура! BBot понял человек0-имя, транслирую:</p>'
							+ '<p class="bbot-output">' + value + '</p>',

							unknownError: '<p>Упс! BBot не разобрал ваше человеческое имя!</p>' +
							'<p>### Внимателbней прочитайте инструкции и попробуйте снова.</p>',

							noQuotes: '<p>Упс! BBot не разобрал ваше человеческое имя!</p>' +
							'<p>Похоже вы забыли использоватb кавычки.</p>',

							isNumeric: '<p>Упс! BBot полагает, что человеческое имя не может быть числом!</p>' +
							'<p>Если вы робот или имперский штурмовик, обратитесb в учебный совет академии.</p>',

							emptyInput: '<p>Упс! BBot не получил ваше человеческое имя!</p>' +
							'<p>### Внимателbней прочитайте инструкции и попробуйте снова.</p>'
						});

					if (value)
					{
						// Если нет " ", будет выброшено исключение
						if (value.exception)
						{
							return botText.resultNotCorrect('noQuotes');
						}

						// Если введено число, то результат отрицательный
						if (isNumeric(value))
						{
							return botText.resultNotCorrect('isNumeric');
						}

						// "Ваше имя" - регулярка направлена
						// на поиск имени в скобках.
						var reg = new RegExp('(.+).*');

						st.set('userName', value);

						return botText.result(reg.test(value));

					}

					return botText.resultNotCorrect('emptyInput');
				}
			},
			{
				title: 'Галактическая единица',
				content: function ()
				{
					return '<p>Отлично кадет ' + st.get('userName') + ', я нашел вас в списках.</p>' +
						'<p>Осталось только ввести ваш возраст в галактической единице измерения времени - <strong>GY</strong>.</p>' +
						'<p>Высылаю вам инструкции.</p>';
				},
				instructions: '<ul>' +
				'<li>Введите свой возраст и поделите на 250 (является периодом вращения систем вокруг центра нашей галактики в млн. лет).</li>' +
				'<li>Для деления используется оператор <span class="red-label">/</span>. ' +
				'<li>Например: <span class="red-label">21 / 250</span></li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/2-1.mp3',
						css: 'astromen-img'
					},
					{
						audio: 'audio/lesson1/2-2.mp3',
						css: 'astromen-img',
						waitForHint: true,
						hint: [
							{
								'click .lesson-alt-hint': 'Нажмите для получения инструкций',
								'nextButton': false,
								'showSkip': false
							}
						]

					}
				],
				result: function (value)
				{
					var botText = BBotText(
						{
							correct: '<p>Ура! BBot разобрал человеческий возраст, транслирую:</p>'
							+ '<p class="bbot-output">' + value + 'GY</p>',

							unknownError: '<p>Упс! BBot не разобрал ваш человеческий возраст!</p>' +
							'<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',

							emptyInput: '<p>BBot ничего не получил, похоже вы забыли воспользоватbся полем ввода или головой.</p>' +
							'<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>'
						});

					if (value)
					{
						if (value.exception)
						{
							return botText.unknownError();
						}

						st.set('userAge', value);

						// Если выведено число, то результат положительный
						return botText.result(isNumeric(value));
					}

					return botText.resultNotCorrect('emptyInput');
				}
			},
			{
				title: 'Да начнется долгий путь...',
				defaultBBot: function ()
				{
					return '<p>Статус: ЗАЧИСЛЕН</p>' +
						'<p>Имя: ' + st.get('userName').toUpperCase() + '</p>' +
						'<p>Раса: ЧЕЛОВЕК</p>' +
						'<p>Возраст: ' + st.get('userAge') + 'GY</p>'
				},
				content: function ()
				{
					return '<p>Поздравляю, теперь вы официально числитесь в академии, кадет!</p>' +
						'<p>Вам предстоит нелегкий путь, чтобы получить гордое звание офицера флота.</p>' +
						'<p>Желаю удачи!</p>';
				},
				instructions: '<ul>' +
				'<li>Нажмите "Далее" для продолжения.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/3-1.mp3',
						css: 'astromen-img'
					}
				]
			}
		]
	};
};
