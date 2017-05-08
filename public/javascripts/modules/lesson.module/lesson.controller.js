'use strict';

// Зависимости
var CodeLauncher = require('../../game/launcher');

// Подключаем TabHandler
var TabHandler = require('../../emitters/tab-handler');
var Diagram = require('../../directives/diagram.directive/diagram');

var lodash = require('lodash');

LessonController.$inject = ['$scope',
							'$stateParams',
							'$state',
							'lessonService',
							'audioManager',
							'aceService',
							'settings'];

module.exports = LessonController;

/**
 * Контроллер окна урока.
 *
 * @author Skurishin Vladislav
 * @since 30.11.2015
 */
function LessonController($scope,
						  $stateParams,
						  $state,
						  lessonService,
						  audioManager,
						  aceService,
						  settings) {

	var VK_GROUP_ID = 105816682;

	var markerService;
	var soundtrack;

	CodeLauncher.onError = onError;

	$scope.isStarsVisible = false;		// Переключатель окна оценки урока
	$scope.starsHide = false;		    // Переключатель окна оценки урока
	$scope.hideEditor = false;		    // Переключатель окна урока
	$scope.audioPause = false;		    // Переключатель кнопки паузы панели управления

	disableLeftContent();

	$scope.CodeLauncher = CodeLauncher;	// Конфигурация кода и редактора

	$scope.toggleAudioPause = toggleAudioPause;
	$scope.previousAudio = previousAudio;
	$scope.toggleEditorOpen = toggleEditorOpen;
	$scope.toggleVkWidgetVisible = toggleVkWidgetVisible;
	$scope.isLessonWithDiagram = isLessonWithDiagram;
	$scope.isLessonWithTable = isLessonWithTable;
	$scope.aceChanged = aceChanged;
	$scope.aceLoaded = aceLoaded;
	$scope.toggleCodeRun = toggleCodeRun;
	$scope.onError = onError;
	$scope.quizAnswer = quizAnswer;
	$scope.toggleContentEnable = toggleContentEnable;
	$scope.disableLeftContent = disableLeftContent;

	$scope.$watch('$viewContentLoaded', onContentLoaded);
	$scope.$on('$destroy', onDestroy);

	$scope.lesson = lessonService.lessonContent($stateParams.id);
	initVk();

	// ==================================================

	// Проверка существования урока
	if (!$scope.lesson) {

		$state.go('lessons');

	}

	// ==================================================

	function initVk () {

		try {

			$scope.vkWidget = VK.Widgets.CommunityMessages("vkCommunityMessages", VK_GROUP_ID, {
				widgetPosition: "right",
				disableExpandChatSound: "1",
				disableButtonTooltip: "1",
				buttonType: "no_button"
			});

		} catch (e) {

			$scope.vkWidgetEnable = false;

		}

	}

	/**
	 * Обощенная функция, который открывает(делает видимым)
	 * окно с необходимым контентом
	 */
	function toggleContentEnable(content) {

		var currentState = $scope[content];

		disableLeftContent();

		$scope[content] = !currentState;

	}

	function toggleVkWidgetVisible () {

		if ($scope.vkWidgetEnable) {

			$scope.vkWidget.minimize();

		} else {

			$scope.vkWidget.expand();

		}

		$scope.vkWidgetEnable = !$scope.vkWidgetEnable;

	}

	function toggleAudioPause() {

		lessonService.audioManager.toggleAudio($scope.audioPause);

		$scope.audioPause = !$scope.audioPause;

	}

	function previousAudio() {

		if (lessonService.audioManager.previousAudio()) {

			$scope.audioPause = false;

		}

	}

	function toggleEditorOpen() {

		$scope.hideEditor = !$scope.hideEditor;

	}

	function isLessonWithDiagram() {

		return Diagram.isHaveChanges();

	}

	function isLessonWithTable() {

		return $scope.char && !lodash.isEmpty($scope.char.lessonTable);

	}

	/**
	 * Обработчик изменения кода в Ace.
	 */
	function aceChanged() {

		//

	}

	/**
	 * Функция закрывает все окна
	 */
	function disableLeftContent() {

		$scope.textContentEnable = false;	// Переключатель текстового контента урока
		$scope.disqusEnable = false;		// Переключатель комментариев
		$scope.diagramEnable = false;		// Переключатель окна диаграммы
		$scope.tableEnable = false;			// Переключатель таблички
		$scope.settingsEnable = false;		// Переключатель натсроек
		$scope.vkWidgetEnable = false;		// Переключатель отображения виджета vk сообщений

	}

	/**
	 * Инициализация Ace.
	 */
	function aceLoaded(editor) {

		// Если определен урок.
		if ($scope.lesson) {

			lessonService.setEditorSession(editor.getSession());

			aceService.initialize(editor, $scope.lesson.rules);

			markerService = aceService.getMarkerService();

			/**
			 * Инициализация урока.
			 */
			lessonService.initialize({
				lessonId: $stateParams.id,
				scope: $scope
			});

		}
	}

	/**
	 * Очистка маркеров.
	 */
	function clearMarker() {

		var markerId = lessonService.getMarkerId();

		// Удаляем старый маркер
		markerId && markerService.deleteMarkerAndAnnotation(markerId);

		return markerId;

	}

	/**
	 * Обработка ошибки при запуске пользовательского кода.
	 */
	function onError(error) {

		// Очищаем 'Кнопку далее'
		$scope.nextSubLesson = null;

		CodeLauncher.stop();

		var markerId = clearMarker();

		// Выводим текст
		$scope.textBot = error;

		if (error) {

			// Номер ошибки кода
			var errorLine = error.stack.split(':')[6] - 2;

			// Выводим ошибку
			$scope.textBot = errorWrapper(error);
			$scope.botCss = 'bbot-angry';

			if (errorLine) {

				// Указываем маркер
				markerId = markerService.setMarkerAndAnnotation(errorLine, error);

				// Сохраняем в сервисе.
				// В связи с использованием указаний в уроке.
				lessonService.setMarkerId(markerId);

			}

		}

		$scope.$apply();

	}

	/**
	 * Выключение / Включение фоновой музыки.
	 */
	function setSoundtrackEnable(enable) {

		if (enable) {

			playSoundtrack();

		} else {

			soundtrack && soundtrack.pause();

		}

	}

	/**
	 * При загрузке запускаем звук.
	 */
	function onContentLoaded() {

		// Если настройка музыки активна,
		settings.onSettingsChange(setSoundtrackEnable, settings.SOUNDTRACK, true);

	}

	function playSoundtrack() {

		soundtrack = audioManager.createSoundtrack();
		soundtrack.play();

		// ПОДПИСЫВАЕМСЯ НА СОСТОЯНИЕ ВКЛАДКИ.
		TabHandler.subscribeOnTabHidden(audioManager.pauseSoundtrack);
		TabHandler.subscribeOnTabShow(resumeSoundtrackWrapper);

	}

	/**
	 * Обертка вокруг метода audioManager.
	 * Проверяет не отключен ли уже саундтрек в настройках.
	 * Если он отключен, то не подписываемся на запуск при
	 * смене закладки.
	 */
	function resumeSoundtrackWrapper() {

		// Аналогичная проверка ведется в lessonService
		// с аудиодорожкой. (НА ПАУЗУ)
		if (settings.isActive(settings.SOUNDTRACK)) {

			audioManager.resumeSoundtrack();

		}

	}

	/**
	 * Запуск / Пауза кода.
	 */
	function toggleCodeRun() {

		clearMarker();

		// Если нет ссылки на следующий урок,
		// удаляем вывод бота
		if (!$scope.nextSubLesson) {

			$scope.textBot = null;

		}

		if (!CodeLauncher.isCodeRunning) {

			lessonService.intiateRunByUserClick();

			// При запуске кода
			// выключаем окно инструкции.
			// Оно зависит от поля showTextContent.
			// ng-show = "showTextContent"
			$scope.textContentEnable = false;
			$scope.settingsEnable = false;
		}
		else {

			lessonService.stop();

		}

	}

	/**
	 * Вызывает директива quiz, при ответе на вопрос.
	 * соответсвтенно задаем мессадж BBot'а.
	 */
	function quizAnswer() {

		var sub = $scope.lesson.sub[$scope.subIndex];

		$scope.textBot = sub.question.correctAnswerDescription;

	}

	function onDestroy() {

		TabHandler.clear();

	}

	function errorWrapper(value) {

		return '<p>Неисправность!! EГГ0Г!!</p> ' +
			'<p>Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">0шибка: ' + value + '</p>' +
			'<p>Пожалуйста, исправьте ситуацию.</p>';

	}
}
