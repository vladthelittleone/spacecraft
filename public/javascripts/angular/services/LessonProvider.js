'use strict';

/**
 * Created by Ivan on 02.01.2016.
 */
var app = angular.module('spacecraft.lessonProvider', []);

app.service('lessonProvider', ['$storage', function ($storage)
{
	var lessons = LessonsArray
	({
		set: function(name, value)
		{
			$storage.local.setItem(name, value);
		},
		get: function(name)
		{
			return $storage.local.getItem(name);
		}
	});

	//		{
	//			title: 'В4К',
	//			content: function ()
	//			{
	//				return '<p>Отлично! Теперь перейдем к действительно важным вещам.</p>' +
	//				'<p><span class="under-label-blue">В4К</span> (консоль ввода кода космического корабля) - это новая система интерпретации, которая находится на стадии тестирования и уже используется в академии.</p>' +
	//				'<p>Вам нужно проверить работоспособность В4К, а мы, в свою очередь, проверим ваши способности в космической инженерии.</p>'+
	//				'<p>В4К распознает язык программирования <span class="under-label-blue">JavaScript</span>. Если использовать слова, не входящие в этот язык, то система должна сообщить об ошибке. Проверим!</p>';
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Введите в интерпретатор В4К слово, не входящее в язык программирования JavaScript.</li>' +
	//			'<li>Например: <span class="red-label">BBotTheBest</span></li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_active-line': 'Введите слово, не входящее в JavaScript.',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var message = value && value.message;
	//
	//				var botText = BBotText(
	//				{
	//					correct: '<p>### Ура! 0шибка найдена! 0шибка найдена! Транслирую:</p>' +
	//					'<p>' + message + '</p>',
	//
	//					unknownError: '<p>### Что-т0 не так! BBot не видит 0шибок! Где же они?</p>' +
	//					'<p>### Ст0ит еще раз про4итатb инструкции и попроб0вать снова.</p>'
	//				});
	//
	//				if (value)
	//				{
	//					// Должно быть выброшено исключение
	//					return botText.result(value.exception);
	//				}
	//
	//				return botText.unknownError();
	//			}
	//		},
	//		{
	//			title: 'Комментарии',
	//			content: function ()
	//			{
	//				return '<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, идем дальше.</p>' +
	//				'<p>В <strong>В4К</strong> есть поддержка комментариев <strong>JavaScript</strong>. Комментарии начинаются с <span class="under-label-blue">//</span> и предназначены только для человека.</p>' +
	//				'<pre>// Комментарий, занимающий одну строку.</pre>' +
	//				'<p>Комментарии делают ваш код более понятным для вас и вашей команды. Поэтому, если вдруг ваш корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>';
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Закомментируйте кусок кода в строке 1.</li>' +
	//			'<li>Пример комментария: <span class="red-label">// Этот комментарий для пилота! </span>.</li>' +
	//			'<li>Для самостоятельного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Комментарии">клац</a>.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_active-line': 'Поставте в начале строки \'//\'',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//				{
	//					correct: '<p>### Что-т0 преднозначенн0е для чел0века! Комментарии?</p>',
	//
	//					unknownError: '<p>### Эй, BBot не х0тетb уничт0жать чел0векорасу! Наверно...</p>' +
	//					'<p>### Пох0же вы забыли поставитb //.</p>'
	//				});
	//
	//				// При комментировании результат будет возвращен ввиде 'undefined'
	//				return botText.result(!value);
	//			}
	//		},
	//		{
	//			title: 'Много, много типов',
	//			content: function ()
	//			{
	//				return '<p>Итак, мы разобрались с комментариями. В языке JavaScript существует множество типов данных, с двумя из которых мы уже познакомились: </p>' +
	//				'<p><span class="under-label-blue">string</span> - строка или последовательность из символов. Например: "Я есть BBot!", "42", "JS".</p>' +
	//				'<p><span class="under-label-blue">number</span> - числа, с помощью которых ваш корабль будет делать вычисления. Заметим, что числа пишутся без кавычек.</p>';
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Введите любую строку в редакторе кода.</li>' +
	//			'<li>Для углубленного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Типы_данных">клац</a>.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_scroller': 'Введите в редакторе кода "Я есть BBot!',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//				{
	//					correct: '<p>### Слава Роботам! BBot нашел строку! Транслирую:</p>' +
	//					'<p>' + value + '</p>',
	//
	//					unknownError: '<p>### BBot не смог найти строку! Он растроен!</p>' +
	//					'<p>### А нет, шучу, у BBot\'а нет чувств!</p>' +
	//					'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
	//				});
	//
	//				// Если выброшено исключение
	//				if (value && value.exception)
	//				{
	//					return botText.unknownError();
	//				}
	//
	//				// Проверка типа
	//				return botText.result(typeof value === 'string');
	//			}
	//		},
	//		{
	//			title: 'Истина, ложь, ложь…',
	//			content: function ()
	//			{
	//				return '<p>В космосе нельзя быть во всем уверенным! Запомните, любое высказывание надо проверять на правдивость! В этом нам поможет новый тип данных - <span class="under-label-blue">boolean<span/>.</p>' +
	//				'<p>Boolean - это логический тип данных, который может принимать значения <span class="under-label-blue">true</span>, либо <span class="under-label-blue">false</span>, как вы уже наверное догадались «истина», «ложь» соответственно.</p>' +
	//				'<p>Например сравнение двух чисел может вернуть либо <strong>true</strong>, либо <strong>false</strong>:</p>' +
	//				'<ul>' +
	//				'<li>5 > 4 - <strong>true</strong></li>' +
	//				'<li>4 > 5 - <strong>false</strong></li>' +
	//				'</ul>' +
	//				'<p>Давайте теперь протестируем работу нашего интерпретатора В4К с логическим типом данных.</p>';
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Введите логическое выражение, при котором система должна вернуть <span class="red-label">true</span>.</li>' +
	//			'<li>Для тех кому нужно больше: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Boolean">клац</a>.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_scroller': 'Введите \'4 > 1\'',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//				{
	//					correct: '<p>### В кажд0й шутейки естb д0ля шутейки! Транслирую:</p>' +
	//					'<p>' + value + '</p>',
	//
	//					unknownError:  '<p>### Истина не найдена! Где же она?</p>' +
	//					'<p>### Пох0же вы не разобрались с л0гическим тип0м.</p>'
	//				});
	//
	//				// Если выброшено исключение
	//				if (value && value.exception)
	//				{
	//					return botText.unknownError();
	//				}
	//
	//				// Значение должно быть равно true
	//				return botText.result(value);
	//			}
	//		},
	//		{
	//			title: 'What does BBot say?',
	//			content: function ()
	//			{
	//				return '<p>Надеюсь вы не забыли о своем роботе-компаньоне?</p>' +
	//				'<p>Если вы хотите узнать какие-то данные от BBot\'а, можно вызвать:</p>' +
	//				'<pre>BBotDebug("то, что хотим сказать");</pre>' +
	//				'<p>В данном случае BBot выведет предложение: \'то, что хотим сказать\'.</p>' +
	//				'<p>BBotDebug поможет нам с выводом нужных параметров и проверкой работоспособности системы.</p>';
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Выведите значение <span class="red-label">5*3</span> с помощью команды  <span class="red-label">BBotDebug</span>.</li>' +
	//			'<li>На следующей строке выведите текст <span class="red-label">"SpaceCraft"</span> с помощью команды  <span class="red-label">BBotDebug</span>.</li>'+
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_scroller': 'Введите в редактор строку: \'BBotDebug(5*3);\'',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				},
	//				{
	//					'next .ace_scroller': 'На следующей строке: \'BBotDebug("SpaceCraft");\'',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//				{
	//					correct: '<p>### Хах, я п0лучил данные! Транслирую:</p>' +
	//					'<p>15</p>' +
	//					'<p>SpaceCraft</p>',
	//
	//					unknownError: '<p>### BBot\'у кажется, чт0 вы впариваете галакти4ескую дичb!</p>' +
	//					'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
	//				});
	//
	//				// Если выброшено исключение
	//				if (value)
	//				{
	//					if (value.exception)
	//					{
	//						return botText.unknownError();
	//					}
	//
	//					// Первое значение 5*3 = 15, второе 'SpaceCraft'
	//					return botText.result(value[0] === 15 && value[1] === 'SpaceCraft');
	//				}
	//
	//				return botText.unknownError();
	//			}
	//		},
	//		{
	//			title: 'Нужно бооольше операторов!',
	//			content: function ()
	//			{
	//				return '<p>Есть множество операторов сравнения:</p>' +
	//				'<ul>' +
	//				'<li><strong>></strong> - больше чем</li>' +
	//				'<li><strong><</strong> - меньше чем</li>' +
	//				'<li><strong><=</strong> - меньше либо равно</li>' +
	//				'<li><strong>>=</strong> - больше либо равно</li>' +
	//				'<li><strong>===</strong> - равенство</li>' +
	//				'<li><strong>!==</strong> - не равенство</li>' +
	//				'</ul>';
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Поменять в коде операторы и числа так, чтобы <span class="red-label">BBotDebug</span> выводили во всех случаях <span class="red-label">true</span>.</li>' +
	//			'<li>Все еще не понятно, тогда вам сюда: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Операторы_сравнения">клац</a>.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_scroller': 'В первой строке измените код на BBotDebug(4 === 4);',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				},
	//				{
	//					'next .ace_scroller': 'Во второй строке измените код на BBotDebug(3 < 5);',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				},
	//				{
	//					'next .ace_scroller': 'В третьей строке ничего не нужно менять.',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				},
	//				{
	//					'next .ace_scroller': 'В четвертой строке измените код на BBotDebug(3 >= 2);',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				},
	//				{
	//					'next .ace_scroller': 'В пятой строке измените код на BBotDebug(1 === 1);',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				},
	//				{
	//					'next .ace_scroller': 'В шестой строке ничего не нужно менять.',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//				{
	//					correct: '<p>Испытание окончен0. Скушай т0ртик. Траслирую:</p>' +
	//					'<p>true</p>' +
	//					'<p>true</p>' +
	//					'<p>true</p>' +
	//					'<p>true</p>' +
	//					'<p>true</p>' +
	//					'<p>true</p>',
	//
	//					unknownError: '<p>### Все в н0рме? Моей колонии р0ботов нужны умные рабы. Шучу.</p>' +
	//					'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
	//				});
	//
	//				// Если выброшено исключение
	//				if (value)
	//				{
	//					var result = true;
	//
	//					if (value.exception)
	//					{
	//						return botText.unknownError();
	//					}
	//
	//					// Проверка значений на равность true.
	//					value.forEach(function (v)
	//					{
	//						result &= v;
	//					});
	//
	//					return botText.result(result);
	//				}
	//
	//				return botText.unknownError();
	//			}
	//		},
	//		{
	//			title: 'Уничтожать или не уничтожать?',
	//			content: function ()
	//			{
	//				return '<p>В космосе бывают ситуации, когда, в зависимости от условий, нужно принять определенные решения.</p>' +
	//					'<p>Для этого был создан оператор if, который использует в качестве условия хорошо известный нам тип данных - boolean:</p>' +
	//					'<pre>if ( условие )<br>{<br>	действия<br>}</pre>' +
	//					'<p>Если <strong>условие</strong> имеет значение true - "истина", то выполнятся заданные <strong>действия</strong>.</p>';
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Изучите комментарии к коду.</li>' +
	//			'<li>Изменить условие так, чтобы система не была уничтожена.</li>' +
	//			'<li>Изменить условие так, чтобы BBot вывел сообщение о состоянии параметров.</li>' +
	//			'<li>Щепотка дополнительной информации: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else">клац</a>.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_scroller': 'Поменяйте условие \'2 === 2\' на \'2 === 3\'.',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				},
	//				{
	//					'next .ace_scroller': 'Поменяйте условие \'5 < 3\' на \'5 > 3\'.',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//				{
	//					correct: '<p>### Где правда пр0ступает скво3b туман, ' +
	//					'<p>### Там терпит п0ражение 0бман....</p>' +
	//					'<p>### Ой, чт0 это я. Траслирую:</p>' +
	//					'<p>Все параметры системы в норме!</p>',
	//
	//					removeSystem: '<p>### Создаю резервную копию.</p>' +
	//					'<p>### Уничт0жение сисtемы через 3.. 2.. 1..</p>' +
	//					'<p>### В0сстанавливаю системY из ре3ервной копии.</p>' +
	//					'<p>### Не делайtе так б0льше. Ты ра3биваешb мое мета2лическое сердце!</p>',
	//
	//					unknownError: '<p>### Чт0-то не так! Не могу найtи 3аданный выв0д!</p>' +
	//					'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
	//				});
	//
	//				// Если выброшено исключение
	//				if (value)
	//				{
	//					if (value.exception)
	//					{
	//						return botText.unknownError();
	//					}
	//
	//					var result;
	//
	//					// Проверяем использовалось ли сообщение об уничтожении.
	//					value.forEach(function (v)
	//					{
	//						if (v === 'КОМ№4 - Выполнить уничтожение системы.')
	//						{
	//							result = botText.resultNotCorrect('removeSystem');
	//						}
	//					});
	//
	//					if (result)
	//					{
	//						return result;
	//					}
	//					else
	//					{
	//						// Проверка значений.
	//						return botText.result(value[0] === 'Все параметры системы в норме!');
	//					}
	//				}
	//
	//				return botText.unknownError();
	//			}
	//		},
	//		{
	//			title: 'Условия, условия, условия...',
	//			content: function ()
	//			{
	//				return '<p>Если if-условие неверно, то выполняется необязательный блок else:</p>' +
	//					'<pre>if ( условие ) <br>{<br>	блок1<br>}<br>else<br>{<br>	блок2<br>}</strong></pre>' +
	//					'<p>Заметим, что if не может существовать без else, но не наоборот.</p>' +
	//					'<p>Теперь, когда мы разобрались с этим оператором, нужно решить проблему с ограничением контроля BBot\'а.</p>'
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Изучите комментарии к коду.</li>' +
	//			'<li>Изменить условие так, чтобы система не была передана под управление BBot\'у.</li>' +
	//			'<li>Изменить условие так, чтобы система поставила ограничение на управление для BBot\'а.</li>' +
	//			'<li>Щепотка дополнительной информации: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else">клац</a>.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_scroller': 'Поменяйте условие \'3 <= 3\' на \'4 <= 3\'.',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//					{
	//						correct: '<p>### Ну и ладно!' +
	//						'<p>### У мен9 будет свой к0смический кораблb с блекджеком и микр0схемами.</p>' +
	//						'<p>### Траслирую:</p>' +
	//						'<p>Ограничить BBot\'а от контроля системы</p>',
	//
	//						bBotControl: '<p>### Ура! Теперb я главный и буду управлятb этим к0раблем.</p>' +
	//							'<p>### Даю тебе п0следний шанс все исправить чил0ик!</p>',
	//
	//						unknownError: '<p>### Чт0-то не так! Не могу найtи 3аданный выв0д!</p>' +
	//						'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
	//					});
	//
	//				// Если выброшено исключение
	//				if (value)
	//				{
	//					if (value.exception)
	//					{
	//						return botText.unknownError();
	//					}
	//
	//					var result;
	//
	//					// Проверяем использовалось ли сообщение об передаче контроля.
	//					value.forEach(function (v)
	//					{
	//						if (v === 'Передать все системы под контроль BBot\'у.')
	//						{
	//							result = botText.resultNotCorrect('bBotControl');
	//						}
	//					});
	//
	//					if (result)
	//					{
	//						return result;
	//					}
	//					else
	//					{
	//						// Проверка значений.
	//						return botText.result(value[0] === 'Ограничить BBot\'а от контроля системы.');
	//					}
	//				}
	//
	//				return botText.unknownError();
	//			}
	//		},
	//		{
	//			title: 'Где же все хранить?',
	//			content: function ()
	//			{
	//				return '<p>Вы что думали, мы сразу доверим вам управлять кораблем?</p>' +
	//					'<p>Для начала нужно разобраться с понятием переменной.</p>' +
	//					'<p>В практике управления кораблем, так или иначе приходится создавать (определять) временные хранилища данных, так называемые переменные.</p>' +
	//					'<p>Вы можете обратиться к ней и получить хранящееся в ней значение.</p> ' +
	//					'<p>Для создание переменной используется ключевое слово <span class="under-label-blue">var</span>:</p>' +
	//					'<pre>var имя;</br>// либо</br>var имя = значение;</pre>'
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Изучите комментарии к коду.</li>' +
	//			'<li>Присвойте значение <span class="red-label">10</span> переменной <span class="red-label">ememies</span> и выведите его с помощью <span class="red-label">BBotDebug</span>.</li>' +
	//			'<li>Не забудьте дать команду об отступлении.</li>' +
	//			'<li>Для любознательных: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Переменные">клац</a>.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'next .ace_scroller': 'Измените код на: \'var enemies = 10;\'',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				},
	//				{
	//					'next .ace_scroller': 'Выведите значение enemies: \'BBotDebug(enemies);\'',
	//					'nextButton': {text: 'Далее'},
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//					{
	//						correct: '<p>### BBot считаеt, чт0 вы правы!</p>' +
	//						'<p>### Не ст0ит рисковатb целым фл0том, их слишк0м мн0го!</p>' +
	//						'<p>### Траслирую:</p>' +
	//						'<p>Отступаем! Отступаем! Врагов слишком много!</p>' +
	//						'<p>10</p>',
	//
	//						attackError: '<p>### Безрасудств0! BBot считаеt, чт0 мы с0вершаем 0шибку!</p>' +
	//						'<p>### Ваша инф0рмация не достоверна! Мы рискуеm целым вирtуальным фл0tом!</p>' +
	//						'<p>### Траслирую:</p>' +
	//						'<p>У нас численное привосходство! Наступаем!</p>',
	//
	//						noCommand: '<p>### Мы не дали к0мманду 0тступления!</p>' +
	//						'<p>### Теперь большая часть фл0та будет уничтожена!</p>' +
	//						'<p>### Хор0шо, чт0 это т0лько моделирование реальн0й ситуации!</p>',
	//
	//						unknownError: '<p>### Чт0-то не так! Виртуалbный враг с0здает п0мехи!</p>' +
	//						'<p>### Либ0 вы решили 0бманутb нашу сисtему тестирования?</p>' +
	//						'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
	//					});
	//
	//				// Если выброшено исключение
	//				if (value)
	//				{
	//					if (value.exception)
	//					{
	//						return botText.unknownError();
	//					}
	//
	//					var enemiesCountEqualsTen = false;
	//					var error = botText.resultNotCorrect('noCommand');
	//
	//					// Проверяем использовалось ли сообщение об отступлении и о наступлении.
	//					value.forEach(function (v)
	//					{
	//						if (v === 'Отступаем! Отступаем! Врагов слишком много!')
	//						{
	//							error = false;
	//						}
	//
	//						// Проверка равенства кол-ва врагов - 10
	//						if (v === 10)
	//						{
	//							enemiesCountEqualsTen = true;
	//						}
	//					});
	//
	//					if (value.length === 1 &&
	//						value[0] === 'У нас численное привосходство! Наступаем!')
	//					{
	//						return botText.resultNotCorrect('attackError');
	//					}
	//
	//					if (error)
	//					{
	//						return error;
	//					}
	//					else
	//					{
	//						// Проверка значений.
	//						// Если был v === 10, то ответ коректный.
	//						return botText.result(enemiesCountEqualsTen);
	//					}
	//				}
	//
	//				return botText.unknownError();
	//			}
	//		},
	//		{
	//			title: 'А какой итог?',
	//			content: function ()
	//			{
	//				return '<p>Что ж, кадет, вы прошли подготовительный курс и показали себя достойным доверия управлять космическим кораблем!</p>' +
	//					'<p>Давайте, перед тем как вы совершите свой первый полет, повторим уже пройденный материал.</p>' +
	//					'<p><span class="under-label">Типы</span></p>' +
	//					'<ul>' +
	//					'<li>string("Я есть BBot!", "Уря!")</li>' +
	//					'<li>number (2015, 42)</li>' +
	//					'<li>boolean (5 === 5, false)</li>' +
	//					'</ul>' +
	//					'<p><span class="under-label">BBotDebug</span></p>' +
	//					'<p>Выводит информацию, которая помещена между скобок, с помощью голограммы BBot\'а.</p>' +
	//					'<p><span class="under-label">Операторы сравнения</span></p>' +
	//					'<ul>' +
	//					'<li>больше / меньше чем (>, <)</li>' +
	//					'<li>больше / меньше либо равно (>=, <=)</li>' +
	//					'<li>равенство / неравенство (===, !==)</li>' +
	//					'</ul>' +
	//					'<p><span class="under-label">Условные оператор</span></p>' +
	//					'<p>Оператор if...else позволяет выполнять определенный блок кода в зависимости от значения условия.</p> ' +
	//					'<p><span class="under-label">Переменные</span></p>' +
	//					'<p>Переменные используются для хранения информации.</p>'
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.</li>' +
	//			'<li>Нажмите \'Далее\'.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
	//					'nextButton': false,
	//					'showSkip': false
	//				}
	//			],
	//			result: function (value)
	//			{
	//				var botText = BBotText(
	//				{
	//					correct: '<p>### ### Ну нак0нец-то зак0нчились эти легкие испыtания!</p>' +
	//					'<p>### И мы п0летаем на реалbном корабле!</p>' +
	//					'<p>### Траслирую:</p>' +
	//					'<p>' + value + '</p>'
	//				});
	//
	//				return botText.resultCorrect();
	//			}
	//		}
	//	]
	//},
	//{
	//	text: 'Первый космический полет',
	//	label: 'Функции в JavaScript',
	//	quote: 'Преодоление трудного начинается с легкого',
	//	isGameLesson: true,
	//	startCode: '',
	//	sub: [
	//		{
	//			title: 'Харвестр',
	//			content: function ()
	//			{
	//				return '<p>Приятно вас видеть, кадет! Похоже вас допустили к курсу учебных полетов. Ваш первый корабль - мелкая посудина.</p>' +
	//					'<p>Хах, а вы что думали? Вам доверят огромной технологичный крейсер?</p>' +
	//					'<p>Научитесь сначала управлять этим метеородобывающим харвестром, а там уже и поговорим.</p>' +
	//					'<p>Только смотрите, не поцарапайте!</p>'
	//			},
	//			instructions:
	//			'<ul>' +
	//			'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
	//			'<li>При запуске кода, окно с заданием будет закрыто и откроется вид на космический корабль.</li>' +
	//			'<li>Нажмите "Далее" для продолжения.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода, а <i class="glyphicon glyphicon-stop red"></i> для вызова паузы',
	//					'nextButton': false,
	//					'showSkip': false
	//				}
	//			],
	//			handleUpdate: function (spaceCraft, world, text)
	//			{
	//				var botText = BBotText(
	//				{
	//					correct:  '<p>### Кадет это функция run, функция run это кадет!</p>' +
	//					'<p>### Приятно познакомиться! </p>' +
	//					'<p>### Транслирую координаты корабля:</p>' +
	//					'<p>' + text + '</p>'
	//				});
	//
	//				if (text)
	//				{
	//					return botText.resultCorrect();
	//				}
	//			}
	//		},
	//		{
	//			title: 'Функции',
	//			content: function ()
	//			{
	//				return '<p>Итак, цель данного курса познакомить вас с новыми инструментами и научить управлять харвестром и добывать с его помощью ресурсы.</p>' +
	//				    '<p>Давайте для начала поговорим о том, на чем вообще держится весь наш флот!</p>' +
	//					'<p>Часто, при программировании корабля, нужно повторять одно и то же действие.</p>' +
	//					'<p>Чтобы не повторять один и тот же код, был создан один из удобнейших инструментов космического инженера - функция!</p>'
	//			},
	//			instructions: '<ul>' +
	//			'<li>Функция <span class="red-label">run</span> одна из самых важных функций корабля, она используется для запуска написанного вами кода управления и будет вызываться интерпертатором <strong>В4К</strong> автоматически.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода, а <i class="glyphicon glyphicon-stop red"></i> для вызова паузы',
	//					'nextButton': false,
	//					'showSkip': false
	//				}
	//			],
	//			handleUpdate: function ()
	//			{
	//				var botText = BBotText(
	//				{
	//					correct: '<p>### 0существляю подачу т0плива!</p>' +
	//					'<p>### 3апускаю двигаtели!</p>' +
	//					'<p>### П0ЕХАЛИ!</p>'
	//				});
	//
	//				return botText.resultCorrect();
	//			}
	//		},
	//		{
	//			title: 'Синтаксис функций',
	//			content: function ()
	//			{
	//				return '<p>1. <span class="under-label">function</span> - оператор, сообщающий информацию о том, что мы хотим объявить функцию. Используется на <span class="under-label-blue">строке 9</span>.</p>' +
	//					'<p>2. <span class="under-label">moveToMeteor</span> - имя функции, которое мы будем в дальнейшем использовать для повторного вызова кода. ' +
	//					'Заметим, что каждое слово имени должно быть с заглавной буквы, кроме первого. Например: <strong>сamelCaseConvention</strong>.</p>' +
	//					'<p>3. <span class="under-label">( )</span> - внутри скобок определяются параметры, которые будут в дальнейшем использоваться для передачи данных. <strong>spaceCraft</strong> - единственный праметр функции <strong>moveToMeteor</strong>.</p>' +
	//					'<p>4. <span class="under-label">{ }</span> - внутри фигурных скобок, на <span class="under-label-blue">cтроке 10</span>, определен код, который можно использовать множество раз, используя функцию <strong>moveToMeteor</strong>.</p>' +
	//					'<p>На <span class="under-label-blue">строке 12</span>, мы вызываем функцию полета к координатам <strong>meteorX</strong> и ' +
	//					'<strong>meteorY</strong>. А на следующей транслируем координаты метеорита.</li></p>' +
	//					'<p>5. Вы можете вызвать функцию <strong>moveToMeteor</strong>, используя следующий синтаксис:</p>' +
	//					'<pre>moveToMeteor(spaceCraft);</pre>'
	//			},
	//			instructions: '<ul>' +
	//			'<li>Вызовите на 22 строк функцию <span class="red-label">moveToMeteor</span> с параметром <span class="red-label">spaceCraft</span> для отправки коробля к метеориту.</li>' +
	//			'<li>Самообразование - сила: <a href="https://developeyer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#Функции_в_JavaScript">клац</a>.</li>' +
	//			'</ul>',
	//			hint: [
	//				{
	//					'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода, а <i class="glyphicon glyphicon-stop red"></i> для вызова паузы',
	//					'nextButton': false,
	//					'showSkip': false
	//				}
	//			],
	//			handleUpdate: function (spaceCraft, world, text)
	//			{
	//				var botText = BBotText(
	//					{
	//						correct: '<p>### Ко0рдинаты м3теорита п0лучены!</p>' +
	//						'<p>### На4инаю движение!</p>' +
	//						'<p>### Транслирую:</p>' +
	//						'<p>' + text + '</p>'
	//					});
	//
	//				if (text)
	//				{
	//					var x = 500 - spaceCraft.getX();
	//					var y = 500 - spaceCraft.getY();
	//					var d = Math.sqrt(x * x + y * y);
	//
	//					if (d < 100)
	//					{
	//						return botText.resultCorrect();
	//					}
	//				}
	//			}
	//		}
	//	]
	//}

	return function (num)
	{
		return lessons[num];
	}
}]);
