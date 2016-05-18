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
				// Похоже вас допустили к курсу учебных полетов. Ваш первый корабль - мелкая посудина.
				// Хах, а вы что думали? Вам доверят огромной технологичный крейсер?
				// Научитесь сначала управлять этим транспортником, а там уже и поговорим.
				// Только смотрите, не поцарапайте!
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
				// Справа показан пример управления транспортным кораблем с помощью JavaScript.
				// Функция run в бесконечном цикле последовательно раз за разом выполняет написанный код управления
				// в данном случае команду поворота налево.
				// Запустите код и увидите результат.
				instructions: '<ul>' +
				'<li>Функция <span class="red-label">run</span> в бесконечном цикле последовательно раз за разом выполняет написанный код управления. Являтеся одной из самых важных функций SpaceCraft.</li>' +
				'<li>Больше информации о JavaScript: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Introduction">клац</a>.</li>' +
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
						marker: {
							x1: 6,
							y2: Infinity,
							type: 'line'
						}
					}
				],
				handleUpdate: function ()
				{
					var botText = BBotText(
					{
						correct: '<p>Кадет это функция run, функция run это кадет!</p>' +
						'<p>Приятно познакомиться! </p>'
					});

					return botText.resultCorrect();
				}
			},
			{
				title: 'Команды',
				content: function ()
				{
					return '<p>Команды - это инструкции раздеяемые точкой с запятой, с помощью которых вы можете управлять кораблем и не только.</p>' +
						'<p>Команды сканируются слева направо, сверху вниз.</p>' +
						'<p>Вы уже знаете команду поворота влево: <pre>transport.rotateLeft();</pre></p>' +
						'<p>Давайте попробуем добавить новую, ранее не изученную.</p>'
				},
				instructions: '<ul>' +
				'<li><span class="red-label">transport.moveForward()</span> - команда, направляющая корабль вперед.</li>' +
				'<li>Добавте команду <span class="red-label">transport.moveForward()</span> на <span class="red-label">11</span> строку.</li>' +
				'<li>Не забудьте про точку с запятой.</li>' +
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
						marker: {
							x1: 6,
							y2: Infinity,
							type: 'line'
						}
					}
				],
				handleUpdate: function (spaceCraft)
				{
					// Хьюстон, у нас проблема
					// Hasta la vista, baby
				 	//var botText = BBotText(
					//{
					//	correct: '<p>Осуществляю подачу топлива!</p>' +
					//	'<p>3апускаю двигатели!</p>' +
					//	'<p>ПОЕХАЛИ!</p>',
                    //
					//	unknownError: '<p>Упс! BBot не разобрал ваш человеческий возраст!</p>' +
					//	'<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>',
                    //
					//	emptyInput: '<p>BBot ничего не получил, похоже вы забыли воспользоватbся полем ввода или головой.</p>' +
					//	'<p>Внимателbней прочитайте инструкции и попробуйте снова.</p>'
					//});

					var botText = BBotText(
					{
						correct: '<p>Осуществляю подачу топлива!</p>' +
							'<p>3апускаю двигатели!</p>' +
							'<p>ПОЕХАЛИ!</p>'
					});

					if (spaceCraft.isMoveForwardCalled())
					{
						return botText.resultCorrect();
					}
				}
			}
		]
	};
};
