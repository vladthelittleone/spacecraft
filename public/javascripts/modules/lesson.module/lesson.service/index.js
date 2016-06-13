'use strict';

var ContentFactory = require('../../../content');

var Storage = require('./storage');
var Interpreter = require('./interpreter');

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
	var options = {};	// Настройки запуска кода и редактора

	var audioWrapper = AudioWrapper();
	var storage = Storage();
	var markers = aceService.getMarkerService;

	that.setEditorSession = setEditorSession;
	that.getEditorSession = getEditorSession;
	that.getCode = getCode;
	that.lessonContent = lessonContent;
	that.initialize = initialize;
	that.run = run;
	that.getMarkerId = getMarkerId;
	that.setMarkerId = setMarkerId;
	that.audioManager = audioWrapper;
	that.options = options;

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

		var ch = scope.char = currentSubLesson().character[audioIndex];

		if (ch) {

			// Получение маркера подурока
			var m = ch.marker;

			// Создание аудио
			audioWrapper.create(ch.audio);

			audioWrapper.play();

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

			options.code = code;

			// Слова BBot'а
			scope.textBot = current.defaultBBot && current.defaultBBot();

			// Добавление кнопки 'Далее'
			scope.nextSubLesson = nextSubLesson;

			scope.isGameLesson = scope.lesson.isGameLesson;

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

		// Обновляем игровые объекты на начальные значения или нет?
		options.resetGame = currentSubLesson().handleUpdate;

		// Код не запущен
		options.isCodeRunning = false;

		// Обновлений в игре scope'а не происходит
		options.update = false;

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
		var statistic = storage.getLessons();

		if (scope.subIndex !== size - 1) {

			++scope.subIndex;

			initNextLesson();

			saveStatistics({
				current:   scope.subIndex + 1, // Прибавляем смещение
				statistic: statistic,
				lessonId:  lessonId,
				size:      size,
				completed: statistic[lessonId].completed
			});

		}
		else {

			saveStatistics({
				current:   1,
				statistic: statistic,
				lessonId:  lessonId,
				size:      size,
				completed:  true
			});

			// Выводим доску оценки подурока
			scope.starsHide = true;

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
		options.code = '';

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

	}

	function runNotGameLesson(current) {

		options.isCodeRunning = true;

		if (current.result) {

			// Запуск интерпретатора
			options.result = Interpreter.execute(options.code);

			var result = current.result(options.result);

			scope.botCss = result.css;

			if (result.status) {

				text(result.message, nextSubLesson);

			}
			else {

				text(result.message);

			}
		}

		options.isCodeRunning = false;
	}

	function runGameLesson(current) {

		// Если handleUpdate задан, то выполняем обработку кода
		if (current.handleUpdate) {

			// Меняем статус запуска кода
			options.isCodeRunning = !options.isCodeRunning;

			options.update = function (args) {

				var s = args.spaceCraft;
				var w = args.world;
				var t = args.text;

				var result = current.handleUpdate(s, w, t);

				if (result && result.status) {

					text(result.message, nextSubLesson);

				}
				else if (t) {

					text(t);

				}

			}

		}

	}

	/**
	 * Запуск кода пользователя.
	 */
	function run() {

		var current = currentSubLesson();

		if (current.isNotGameLesson) {

			runNotGameLesson(current);

		}
		else {

			runGameLesson(current);

		}

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
