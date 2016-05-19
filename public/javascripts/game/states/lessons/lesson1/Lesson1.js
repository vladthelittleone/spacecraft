/**
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
var Lesson1 = function (st)
{
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
						'<p>Основная задача академии заключается в освоении кадетами данного инструмента.</p>'
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
				'<li>Добавте команду <span class="red-label">transport.moveForward()</span> на <strong>11</strong> строку.</li>' +
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
			},
			{
				title: 'What does BBot say?',
				isNotGameLesson: true,
				content: function ()
				{
					return '<p>Надеюсь вы не забыли о своем роботе-компаньоне?</p>' +
						'<p>Если вы хотите узнать какие-то данные от BBot\'а, можно вызвать команду:</p>' +
						'<pre>BBotDebug(\'то, что хотим сказать\');</pre>' +
						'<p>BBotDebug поможет нам с выводом нужных параметров и проверкой работоспособности системы.</p>';
				},
				// Давайте рассмотрим пример как это работает
				// На второй строке команда BBotDebug будет выводить 'Это BBot!'
				// Запустите и увидите результат.
				// Что ж теперь попробуем вывести 'Всем привет!' на пятой строке
				instructions: '<ul>' +
					'<li>Команда <span class="under-label">BBotDebug</span> на строке <strong>2</strong> выведет <span class="under-label">\'Это BBot!\'</span>.</li>' +
					'<li>Выведите текст <span class="under-label">\'Всем привет!\'</span> с помощью изученной команды.</li>'+
					'</ul>',
				hint: '<ul>' +
				'<li>Добавьте команду <span class="under-label-gray">BBotDebug(\'Всем привет!\');</span> на <strong>5</strong> строку.</li>'+
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
				result: function (v)
				{
					var t = '';
					var r = false;

					v.forEach(function (e)
					{
						t += e + '</br>';
						r = (e === 'Всем привет!');
					});

					var botText = BBotText(
					{
						correct: '<p>Хах, я п0лучил нужные данные! Транслирую:</p>' +
						'<p class="bbot-output">' + t + '</p>',
						text: t
					});

					if (r)
					{
						return botText.resultCorrect();
					}

					return botText.text();
				}
			},
			{
				title: 'Комментарии',
				content: function ()
				{
					return '<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, идем дальше.</p>' +
					'<p>В <strong>В4К</strong> есть поддержка комментариев <strong>JavaScript</strong>. Комментарии начинаются с <span class="under-label-blue">//</span> и предназначены только для человека.</p>' +
					'<pre>// Комментарий, занимающий одну строку.</pre>' +
					'<p>Комментарии делают ваш код более понятным для вас и вашей команды. Поэтому, если вдруг ваш корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>';
				},
				instructions: '<ul>' +
				'<li><span class="under-label">transport.moveForward()</span> - команда, направляющая корабль вперед.</li>' +
				'<li>Добавте команду <span class="under-label">transport.moveForward()</span> на <span class="under-label">11</span> строку.</li>' +
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
