'use strict';

// Зависимсоти
var Game = require('../../../game');

var CodeLauncher = Game.codeLauncher;
var ContentFactory = Game.content;
var EntitiesFactory = Game.world;

var Interpreter = require('./interpreter');
var TabHandler = require( '../../../emitters' );
var Statistics = require('../../../utils/statistics');
var AudioWrapper = require('./audio');

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
	var lessons;		// массив уроков. Содержит данные по ВСЕМ урокам пользователя.

	// Константа для указания окончания урока в поле currentSubLesson статистики.
	var LESSON_IS_FINISHED = 0;

	var audioWrapper = AudioWrapper(audioManager, initNextLessonContent);
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

		// Регистрируем текущий подурок урока в scope.
		scope.curretSubLesson = current;

		var ch = scope.char = current.character[audioWrapper.audioIndex];

		if (ch) {

			// Запуск при старте
			if (current.runOnStart) {

				run();

			}

			// Получение маркера подурока
			var m = ch.marker;

			// Создание аудио
			audioWrapper.create(ch.audio);
			audioWrapper.play();

			// ПОДПИСЫВАЕМСЯ НА СОСТОЯНИЕ ВКЛАДКИ
			TabHandler.subscribeOnTabHidden( audioWrapper.pause );
			TabHandler.subscribeOnTabShow( function () {

				// Если не последняя реплика
				if (!scope.audioPause) {

					audioWrapper.play()
				}

			} );

			// Постановка на паузу
			scope.audioPause = false;

			tryShowHint(ch, function () {

				scope.audioPause = true;

				// Увеличение счетчиа номера трека
				audioWrapper.audioIndex++;

				initNextLessonContent();

				scope.$apply();

			});

			markers().deleteMarkerAndAnnotation(markerId);

			// Обработка отрисовки маркеров
			if (m) {

				markerId = markers().paintMarker(m.x1, m.y1, m.x2, m.y2, m.type);

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

		lessons[ args.lessonId ] = args;

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
		audioWrapper.audioIndex = 0;

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

		var lessonIsNotFinished = scope.subIndex !== size - 1;

		if (lessonIsNotFinished) {

			// Обновляем игровые объекты на начальные значения или нет?
			currentSubLesson().gamePostUpdate && Game.restart();

			++scope.subIndex;

			initNextLesson();

			saveStatistics({
				currentSubLesson:       scope.subIndex,
				lessonId:      			lessonId,
				size:          			size,
				completed:     			false, // мы еще не закончили урок до конца, поэтому false.
				statistics:    			currentStatistics
			});

		}
		else {

			currentStatistics.updateBestResults();

			// Также сохраняем очки за урок.
			saveStatistics({
				currentSubLesson:       LESSON_IS_FINISHED,
				lessonId:      			lessonId,
				size:          			size,
				completed: 	  			true,
				statistics:    			currentStatistics
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
	 * Метод обработки данных по урокам, которые были выгружены либо
	 * с локального хранилища либо с сервера.
	 * На самом деле, совершенно не важно, откуда они были получены,
	 * так как алгоритм их обработки един для всех случаев.
	 * Поэтому он и был вынесен в отдельный метод :)
	 *
	 * @param lessons массив уроков.
	 * @param lessonId номер обрабатываемого урока.
     */
	function prepareLesson(lessons, lessonId) {

		var currentLesson = lessons && lessons[lessonId];

		if (currentLesson) {

			var lessonPoints = lessonContent(lessonId).points;

			// Реинициализируем текущую статистику по уроку с учетом только что
			// выгруженных данных из хранилища.
			currentStatistics.initialize(lessonPoints, currentLesson);

			var size = scope.lesson.sub.length;

			scope.subIndex = currentLesson.currentSubLesson;

			// Индекс подурока (% используется на случай изменений в размерах)
			scope.subIndex = scope.subIndex % size;

		}

		initNextLesson();

	}

	/**
	 * Загрузка уроков из локального хранилища или удаленного.
	 * Метод сперва пытается выгрузить уроки из локального хранилища (local storage браузера).
	 * Если в браузере отсутствуют данные, то осуществляется попытка выгрузки уроков с сервера.
	 */
	function loadLessons() {

		// Идем в базу за статистикой по урокам в случае отсутствия в лок. хранилище
		connection.getLessonsStatistics(function (result) {

			// Запоминаем ссылку на данные по урокам, которые выгрузили с сервера.
			lessons = result.data;

			prepareLesson(lessons, lessonId);

		});

	}

	/**
	 * Инициализация.
	 */
	function initialize(args) {

		CodeLauncher.isCodeRunning = false;

		scope = args.scope;
		lessonId = args.lessonId;

		var lessonPoints = lessonContent(lessonId).points;

		currentStatistics.initialize(lessonPoints);

		scope.subIndex = 0;
		audioWrapper.audioIndex = 0;

		// Загружаем уроки из хранилища (локального или удаленного).
		loadLessons();

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

			// Увеличиваем счетчик запуска интерпретатора.
			currentStatistics.incRunCount();

			// Запуск интерпретатора
			var interpreted = Interpreter.execute(getCode());

			// interpreted может быть равен undefined
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

				var result = current.interpreterHandler(interpreted);

				scope.botCss = result.css;

				if (result.status) {

					text(result.message, nextSubLesson);

				}
				else {

					text(result.message);

					//Отнимаем очки по уроку за некорректный ввод.
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

		current.gamePreUpdate && current.gamePreUpdate(audioWrapper.audioIndex, run);

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
