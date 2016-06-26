'use strict';

// Зависимсоти
var Game = require('../../../game');

var CodeLauncher = Game.codeLauncher;
var ContentFactory = Game.content;
var EntitiesFactory = Game.world;

var Storage = require('./storage');
var Interpreter = require('./interpreter');

// Подключаем TabHandler
var tabHandler = require( '../../../emitters' );

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

		var currentAudioIndex;

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
			tabHandler.subscribeOnTabHidden( audioWrapper.pause );
			tabHandler.subscribeOnTabShow( audioWrapper.play );



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
			current:   args.current,
			size:      args.size,
			completed: completed
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
				current:   scope.subIndex + 1, // Прибавляем смещение
				statistic: statistics,
				lessonId:  lessonId,
				size:      size,
				completed: completed
			});

		}
		else {

			saveStatistics({
				current:   1,
				statistic: statistics,
				lessonId:  lessonId,
				size:      size,
				completed: true
			});

			// Выводим доску оценки подурока
			scope.starsHide = true;

			// Я предполагаю, что здесь уже конец урока.
			// Очищаем коллбэки на обработку событий по вкладке.
			// ЗДЕСЬ ПРОБЛЕМА.
			// В момент появления на экране "звездочек"
			// все подписчики удаляются, и соотв. смена влкадки при "звездочках"
			// на экране не останавливает звук.
			// Наверное имеет смысл оставить эту проблему на обсуждение, ровно также, как
			// и проблему с повторным воспроизведением голоса.
			tabHandler.clear();

		}
	}

	/**
	 * Инициализация.
	 */
	function initialize(args) {

		scope = args.scope;
		lessonId = args.lessonId;

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

					// Индекс подурока (% используется на случай изменений в размерах)
					scope.subIndex = serverIndex % size;

				}

				initNextLesson();

			});

		}
		else {

			scope.subIndex = config - 1;

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

				// В случае исключения выводим ошибку
				text(interpreted.message);

				// И меняем стиль бота.
				scope.botCss = 'bbot-wow';

			} else {

				// Обработка в хендлере урока
				var result = current.interpreterHandler(interpreted);

				scope.botCss = result.css;

				if (result.status) {

					text(result.message, nextSubLesson);

				}
				else {

					text(result.message);

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
