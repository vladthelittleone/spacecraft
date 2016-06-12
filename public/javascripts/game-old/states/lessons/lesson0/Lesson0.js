/**
 * @since 23.03.16
 * @author Skurishin Vladislav
 */
lessons[0] = function (storage)
{
	var that = {};

	function isNumeric(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	that.preload =
	{
		'harvester': 'images/sprites/spaceCraft/harvester.png',
		'starField': 'images/sprites/starField.png',
		'shield': 'images/sprites/shield.png',
		'base': 'images/sprites/base/base.png',
		'meteor1': 'images/sprites/meteor/meteor1.png'
	};

	that.lessonContent =
	{
		text: 'Поступление в академию',
		label: 'Основы JavaScript',
		quote: 'Знания свет — путь укажет нам',
		startCode: '',
		sub:
		[
			{
				title: 'Добро пожаловать в академию!',
				isNotGameLesson: true,
				defaultBBot: function ()
				{
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
				'<li>Правее находится панель управления, с помощью которой вы сможете управлять записями, запускать код и вывести текстовый материал.</li>' +
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
								'next .right-toolbar': 'Панель управления',
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
				isNotGameLesson: true,
				content: function ()
				{
					return '<p>Так, новенький, нам нужно уладить еще пару ненужных бюрократических моментов.</p>' +
						'<p>Введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
						'<p>Высылаю вам инструкции по выполнению.</p>'
				},
				instructions: '<ul>' +
				'<li>Введите свое имя в кавычках, к примеру для меня код будет выглядеть так: <span class="under-label">"Нилар"</span>.</li>' +
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

						storage.setString('userName', value);

						return botText.result(reg.test(value));

					}

					return botText.resultNotCorrect('emptyInput');
				}
			},
			{
				title: 'Галактическая единица',
				isNotGameLesson: true,
				content: function ()
				{
					return '<p>Отлично кадет ' + storage.getString('userName') + ', я нашел вас в списках.</p>' +
						'<p>Осталось только ввести ваш возраст в галактической единице измерения времени - <strong>GY</strong>.</p>' +
						'<p>Высылаю вам инструкции.</p>';
				},
				instructions: '<ul>' +
				'<li>Введите свой возраст и поделите на 250 (является периодом вращения систем вокруг центра нашей галактики в млн. лет).</li>' +
				'<li>Для деления используется оператор <span class="under-label">/</span>.</li>' +
				'<li>Например: <span class="under-label">21 / 250</span>.</li>' +
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

						storage.setString('userAge', value);

						// Если выведено число, то результат положительный
						return botText.result(isNumeric(value));
					}

					return botText.resultNotCorrect('emptyInput');
				}
			},
			{
				title: 'Да начнется долгий путь...',
				isNotGameLesson: true,
				defaultBBot: function ()
				{
					return '<p>Статус: ЗАЧИСЛЕН</p>' +
						'<p>Имя: ' + storage.getString('userName').toUpperCase() + '</p>' +
						'<p>Раса: ЧЕЛОВЕК</p>' +
						'<p>Возраст: ' + storage.getString('userAge') + 'GY</p>'
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

	that.lessonPlayState = function (spec)
	{
		var that = PlayState(spec);

		var game = spec.game;
		var sc = game.sc;
		var base = {};

		var gameInit = that.gameInit;
		var tileUpdate = that.updateTileSprite;

		//===================================
		//============== CYCLE ==============
		//===================================

		that.create = function ()
		{
			gameInit(sc.world.getBounds());
			that.entitiesInit();
			game.camera.focusOnXY(base.sprite.x + (base.sprite.width / 4), base.sprite.y);
		};

		that.update = function ()
		{
			if (!game.paused)
			{
				base.update();
				sc.world.update();
			}

			tileUpdate();
		};

		that.entitiesInit = function ()
		{
			var factory = sc.world.factory;

			base = AcademyBase({
				game: game,
				x: game.world.centerX,
				y: game.world.centerY,
				spriteName: 'base'
			});

			for (var i = 0; i < 3; i++)
			{
				var i1 = utils.randomInt(-200, 200);
				var i2 = utils.randomInt(-200, 200);

				factory.createHarvester({
					x: base.sprite.x + i1,
					y: base.sprite.y + i2,
					angle: game.rnd.angle(),
					harvestRange: 100,
					maxTank: 50,
					harvestRate: 400,
					strategy: function (args)
					{
						var spaceCraft = args.spaceCraft;

						spaceCraft.engine.moveForward();
						spaceCraft.engine.rotateLeft();
					}
				});
			}
		};

		return that;
	};

	return that;
};
