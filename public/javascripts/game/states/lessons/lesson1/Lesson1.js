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
		text: 'Первое занятие',
		label: 'Основы JavaScript',
		quote: 'Преодоление трудного начинается с легкого',
		startCode: '',
		isGameLesson: true,
		sub: [
			{
				title: 'Программа академии',
				defaultBBot: function () {
					return '<p>Приветствую, 62 69 74 65 20 6d 79 20 73 68 69 6e 79 20 6d 65 74 61 6c 20 61 73 73...</p>' +
						'<p>Упс! Дройд BBot - рестарт...</p>'
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
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						]
					}
				]
			},
			{
				title: 'JavaScript',
				content: function ()
				{
					return '<p>Все космические корабли нашего флота управляются с помощью древней земной технологии - JavaScript.</p>' +
						'<p>JavaScript - язык программирования, который был создан в 1995, за 31 год до колонизации Марса компанией EnoSam.</p>' +
						'<p>Основная задача академии заключается в освоение кадетами данного инструмента.</p>'
				},
				// Приятно вас видеть, кадет! Похоже вас допустили к курсу учебных полетов. Ваш первый корабль - мелкая посудина.
				// Хах, а вы что думали? Вам доверят огромной технологичный крейсер?
				// Научитесь сначала управлять этим транспортником, а там уже и поговорим.
				// Только смотрите, не поцарапайте!
				instructions: '<ul>' +
				'<li>Справа показан пример управления транспортным кораблем с помощью JavaScript.</li>' +
				'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
				'</ul>',
				character: [
					{
						audio: 'audio/lesson1/3.mp3',
						css: 'astrogirl-img',
						hint: [
							{
								'next .ace_scroller': 'Редактор кода',
								'nextButton': {text: 'Далее'},
								'showSkip': false
							}
						],
						marker: 8
					}
				],
				handleUpdate: function ()
				{
					var botText = BBotText(
					{
						correct: '<p>Осуществляю подачу топлива!</p>' +
						'<p>3апускаю двигатели!</p>' +
						'<p>ПОЕХАЛИ!</p>'
					});

					return botText.resultCorrect();
				}
			},
			{
				title: 'Команды',
				content: function ()
				{
					return '<p>Команды - это инструкции раздеяемые точкой с запятой, с помощью которых вы можете управлять кораблем и не только.</p>' +
						'<p>.</p>' +
						'<p>JavaScript был создан в 1995, за 31 год до колонизации Марса компанией EnoSamr.</p>'
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
			}
		]
	};
};
