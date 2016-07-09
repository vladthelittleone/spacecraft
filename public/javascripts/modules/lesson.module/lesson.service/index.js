'use strict';

// Зависимсоти
var Game = require('../../../game');

var CodeLauncher = Game.codeLauncher;
var ContentFactory = Game.content;
var EntitiesFactory = Game.world;

var Storage = require('./storage');
var Interpreter = require('./interpreter');
var TabHandler = require( '../../../emitters' );
var Statistics = require('../../../services/statistics.service');

LessonService.$inject = ['connection', 'audioManager', 'aceService'];

module.exports = LessonService;

/**
 * Сервис бизнес-логики контроллера уроков.
 *
 * Created by Ivan on 07.05.2016.
 *
 * @see LessonController
 */
function LessonService(connection, audioManager, aceService) {

	var that = {};

	var editorSession;	// Сессия Ace
	var markerId; 		// Маркер
	var lessonId;		// Идентификатор урока
	var scope;			// scope
	var audioIndex;		// Индекс текущиего трека

	var audioWrapper = AudioWrapper();
	var storage = Storage();
	var markers = aceService.getMarkerService;
	var currentStatistics = Statistics();

	that.setEditorSession = setEditorSession;
	that.getEditorSession = getEditorSession;
	that.getCode = getCode;
	that.lessonContent = lessonContent;
	that.initialize = initialize;
	that.run = run;
	that.stop = stop;
	that.getMarkerId = getMarkerId;
	that.setMarkerId = setMarkerId;
	that.audioManager = audioWrapper;

	return that;

	/**
	 * Обертка доп. функционала вокруг AudioManager.
	 */
	function AudioWrapper() {

		var audio;

		var that = {};

		/**
		 * Открытие предыдущего урока.
		 */
		function previous() {

			audioIndex = Math.max(audioIndex - 2, 0);

			initNextLessonContent();

		}

		/**
		 * Включить предыдущую дорожку.
		 */
		that.previousAudio = function () {

			// При определенном значение времени текущего трека
			// не переклчюаемся на предыдущий трек,
			// а начинаем сначала текущий.
			if (audio.currentTime / 5 < 1) {

				audio.pause();

				audio.currentTime = 0;

				previous();

				return true;

			}
			else {

				audio.currentTime = 0;

			}

		};

		/**
		 * Переключатель аудио.
		 */
		that.toggleAudio = function (audioPause) {

			if (audioPause) {

				audio.play();

			}
			else {

				audio.pause();

			}

		};


		that.play = function () {

			audio.play();

		};


		that.pause = function () {

			audio.pause();

		};

		that.onEnd = function (callback) {

			audio.onended = callback;

		};

		that.create = function (a) {

			audio = audioManager.createVoice(a);

		};

		return that;

	}

	/**
	 * Текущий подурок.
	 */
	function currentSubLesson() {

		return scope.lesson.sub[scope.subIndex];

	}

	/**
	 * Формирование аудио и подсказок для следующего подурока.
	 */
	function initNextLessonContent() {

		var current = currentSubLesson();

		var ch = scope.char = current.character[audioIndex];

		if (ch) {

			// Запуск при старте
			if (current.runOnStart) {

				run();

			}

			// Получение маркера подурока
			var m = ch.marker;

			// Создание аудио
			audioWrapper.create(ch.audio)
			audioWrapper.play();

			// ПОДПИСЫВАЕМСЯ НА СОСТОЯНИЕ ВКЛАДКИ
			TabHandler.subscribeOnTabHidden( audioWrapper.pause );
			TabHandler.subscribeOnTabShow( audioWrapper.play );

			// Постановка на паузу
			scope.audioPause = false;

			tryShowHint(ch, function () {

				scope.audioPause = true;

				// Увеличение счетчиа номера трека
				audioIndex++;

				initNextLessonContent();

				scope.$apply();

			});

			// Обработка отрисовки маркеров
			if (m) {

				markerId = markers().paintMarker(editorSession, m.x1, m.y1, m.x2, m.y2, m.type);

			}
			else {

				markers().deleteMarkerAndAnnotation(editorSession, markerId);

			}

		}

	}

	/**
	 * Запуск подсказки EnjoyHint.
	 */
	function tryShowHint(char, callback) {

		var hint = char.hint;

		if (hint) {

			var enjoyHint = new EnjoyHint({

				onEnd: function () {

					enjoyHint = null;

					// В случае  true - ждем нажатия на подсказку
					if (char.waitForHint) {

						audioWrapper.onEnd(callback);

					}

				}

			});

			enjoyHint.set(hint);
			enjoyHint.run();

			if (!char.waitForHint) {

				// При окончании трека
				audioWrapper.onEnd(function () {

					// Удаляем подсказку
					enjoyHint && enjoyHint.trigger("skip");

					// Вызываем callback
					callback && callback();

				});

			}
		}
		else {

			audioWrapper.onEnd(callback);

		}

	}

	/**
	 * Инициализация код урока.
	 */
	function initNextLesson() {

		// Текущий подурок
		var current = currentSubLesson();

		// Отправка запроса на получение кода следующего уркоа
		connection.getLessonCodeFromJs(lessonId, scope.subIndex, function (res) {

			var code = res.data;

			// Сохранение в Ace.
			editorSession.setValue(code);

			// Слова BBot'а
			scope.textBot = current.defaultBBot && current.defaultBBot();

			// Добавление кнопки 'Далее'
			scope.nextSubLesson = nextSubLesson;

			initNextLessonContent();

		});

	}

	/**
	 * Сохранение статистики
	 */
	function saveStatistics(args) {

		var id = args.lessonId;
		var completed = args.completed;

		// Устанавливаем текущий урок
		args.statistic[id] =
		{
			current:       args.current,
			size:          args.size,
			completed:     completed,
			statistics:    args.statistics
		};

		storage.set('lessons', args.statistic);

		connection.saveLessonsStatistics(args);
	}

	/**
	 * Очистка контента.
	 */
	function clearContent() {

		CodeLauncher.stop();

		// Удаление маркеров
		markers().deleteMarkerAndAnnotation(editorSession, markerId);

		// Установка трека в 0
		audioIndex = 0;

		// Сокрытие панели инструкций
		scope.textContent = false;

	}

	/**
	 * Переход на следующий урок.
	 * Обновление всей информации и очистка старой.
	 */
	function nextSubLesson() {

		clearContent();

		// Размер массива подуроков
		var size = scope.lesson.sub.length;

		// Текущий объект статистики уроков
		var statistics = storage.getLessons();

		if (scope.subIndex !== size - 1) {

			// Обновляем игровые объекты на начальные значения или нет?
			currentSubLesson().gamePostUpdate && Game.restart();

			var subStatistic = statistics[lessonId];
			var completed = subStatistic && subStatistic.completed;

			++scope.subIndex;

			initNextLesson();

			saveStatistics({
				current:       scope.subIndex + 1, // Прибавляем смещение
				statistic:     statistics,
				lessonId:      lessonId,
				size:          size,
				completed:     completed,
				statistics:    currentStatistics
			});

		}
		else {

			// Также сохраняем очки за урок.
			saveStatistics({
				current:       1,
				statistic:     statistics,
				lessonId:      lessonId,
				size:          size,
				completed: 	   true,
				statistics:    currentStatistics
			});

			// Вызываем метод обработки ситуации ОКОНЧАНИЯ урока.
			endLesson();

		}

	}

	/**
	 * Окончание урока.
	 * Метод вызывается после того, как урок полностью окончен.
	 */
	function endLesson() {

		// Выводим доску оценки подурока
		scope.starsHide = true;

		// Вызываем коллбэки, которые подписались на скрытие вкладки,
		// так как на данном этапе урок закончен, и можно считать,
		// что вкладка с уроком будто бы СКРЫТА.
		// А по факту - мы просто останавливаем ВСЕ звуки.
		TabHandler.executeHiddenCallbacks();

		// Очищаем подписичиков на вкладу
		TabHandler.clear();

	}

	/**
	 * Инициализация.
	 */
	function initialize(args) {

		scope = args.scope;
		lessonId = args.lessonId;

		var lessonPoints = lessonContent(lessonId).points;
		currentStatistics.initialize(lessonPoints);

		scope.subIndex = 0;
		audioIndex = 0;

		// Получаем урок из локального хранилища
		var config = storage.getCurrent(lessonId);

		if (!config) {

			// Идем в базу за статистикой по урокам в случае отсутствия в лок. хранилище
			connection.getLessonsStatistics(function (result) {

				var statistics = result.data[lessonId];

				if (statistics) {

					var size = scope.lesson.sub.length;

					// Индекс подурока сервера
					var serverIndex = parseInt(statistics.current);

					// восстанавлвиаем всю статистку по текущему уроку:
					// - число запусков интерпретатора;
					// - очки за урок.
					// - и т.д.
					currentStatistics.restore(statistics);

					// Индекс подурока (% используется на случай изменений в размерах)
					scope.subIndex = serverIndex % size;

				}

				initNextLesson();

			});

		}
		else {

			scope.subIndex = config - 1;

			// восстанавлвиаем всю статистку по текущему уроку:
			// - число запусков интерпретатора;
			// - очки за урок.
			// - и т.д.
			var arrStatistics = storage.getLessons();
			currentStatistics.restore(arrStatistics[lessonId]);

			initNextLesson();

		}

	}

	/**
	 * Вывод текста BBot'ом
	 *
	 * @param message текст
	 * @param nextSubLesson добавление кнопки 'Далее'
	 */
	function text(message, nextSubLesson) {

		scope.textBot = message;

		// Добавляем ссылку на функцию и кнопку 'Далее'
		scope.nextSubLesson = nextSubLesson;

		// Если цикл не запущен, выполняем обновления scope
		!scope.$$phase && scope.$apply();

	}

	function runNotGameLesson(current) {

		CodeLauncher.isCodeRunning = true;

		if (current.interpreterHandler) {

			// Запуск интерпретатора
			var interpreted = Interpreter.execute(getCode());

			// interpreted может бырть раен undefined
			var exception = interpreted && interpreted.exception;

			// Обработка исключения
			if (exception) {

				// Отнимаем очки за исключение.
				currentStatistics.subPointsForException();

				// В случае исключения выводим ошибку
				text(interpreted.message);

				// И меняем стиль бота.
				scope.botCss = 'bbot-wow';

			}
			else {

				// Обработка в хендлере урока
				// Также передаем в обработчик объект по работе с очками текущего урока,
				// чтобы у него была возможность изменять текущее число очков по уроку.
				var result = current.interpreterHandler(interpreted);

				scope.botCss = result.css;

				if (result.status) {

					text(result.message, nextSubLesson);

				}
				else {

					text(result.message);

					currentStatistics.subPointsForIncorrectInput();

				}

			}

		}

		CodeLauncher.isCodeRunning = false;
	}

	function runGameLesson(current) {

		// Если gamePostUpdate задан, то выполняем обработку кода
		if (current.gamePostUpdate) {

			var code = getCode();

			CodeLauncher.run(code, gamePostUpdate, gamePreUpdate);

		}

	}

	/**
	 * Коллбек выполняющийся перед обновлением игры
	 */
	function gamePreUpdate() {

		var current = currentSubLesson();

		current.gamePreUpdate && current.gamePreUpdate(audioIndex, run);

	}

	/**
	 * Коллбек выполняющийся при обновлении игры
     */
	function gamePostUpdate(botText) {

		var current = currentSubLesson();
		var world = EntitiesFactory.getWorld();
		var player = world.getPlayer();

		var result = current.gamePostUpdate(player.api, world, botText);

		if (result && result.status) {

			text(result.message, nextSubLesson);

			return true;

		}

		if (result && result.message) {

			text(result.message);

			return true;

		}

	}

	/**
	 * Запуск кода пользователя.
	 */
	function run() {

		var current = currentSubLesson();

		if (current.interpreterHandler) {

			// Увеличиваем счетчик запуска интерпретатора.
			currentStatistics.incRunCount();

			runNotGameLesson(current);

		}
		else {

			runGameLesson(current);

		}

	}

	/**
	 * Остановка кода.
	 */
	function stop() {

		CodeLauncher.stop();

	}

	/**
	 * Контент урока
	 */
	function lessonContent(num) {

		return ContentFactory.content(num).lessonContent;

	}

	function setEditorSession(value) {

		editorSession = value;

	}

	function getEditorSession() {

		return editorSession;

	}

	function getCode() {

		return editorSession.getDocument().getValue();

	}

	function getMarkerId() {

		return markerId;

	}

	function setMarkerId(id) {

		markerId = id;

	}

}
