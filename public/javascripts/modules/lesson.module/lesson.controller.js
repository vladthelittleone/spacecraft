'use strict';

// Зависимости
var CodeLauncher = require('../../game/launcher');

// Подключаем TabHandler
var TabHandler = require('../../emitters/tab-handler');

LessonController.$inject = ['$scope',
	'$stateParams',
	'$state',
	'lessonService',
	'audioManager',
	'aceService',
	'settings'
];

module.exports = LessonController;

/**
 * Контрллер окна урока.
 *
 * @author Skurishin Vladislav
 * @since 30.11.2015
 */
function LessonController($scope, $stateParams, $state, service, audioManager, aceService, settings) {

	var markerService;
	var soundtrack;

	CodeLauncher.onError = onError;

	$scope.starsHide = false;		// Переключатель окна оценки урока
	$scope.hideEditor = false;		// Переключатель окна урока
	$scope.showTextContent = false; // Переключатель текстового контента урока
	$scope.showSettings = false;	// Переключатель натсроек
	$scope.audioPause = false;		// Переключатель кнопки паузы панели управления
	$scope.hint = false;			// Переключатель подсказок

	$scope.idLesson = $stateParams.id;						// Идентификатор урока
	$scope.CodeLauncher = CodeLauncher;						// Конфигурация кода и редактора
	$scope.lesson = service.lessonContent($stateParams.id);	// Контент урока

	$scope.toggleTextContent = toggleTextContent;
	$scope.toggleSettings = toggleSettings;
	$scope.toggleAudioPause = toggleAudioPause;
	$scope.previousAudio = previousAudio;
	$scope.toggleEditorOpen = toggleEditorOpen;
	$scope.aceChanged = aceChanged;
	$scope.aceLoaded = aceLoaded;
	$scope.toggleCodeRun = toggleCodeRun;
	$scope.onError = onError;

	$scope.$watch('$viewContentLoaded', onContentLoaded);
	$scope.$on('$destroy', onDestroy);

	// ==================================================

	// Проверка существования урока
	if (!$scope.lesson) {

		$state.go('lessons');

	}

	// ==================================================

	function toggleTextContent() {

		$scope.showTextContent = !$scope.showTextContent;

		$scope.showSettings = false;

	}

	function toggleSettings() {

		$scope.showSettings = !$scope.showSettings;

		$scope.showTextContent = false;

	}

	function toggleAudioPause() {

		service.audioManager.toggleAudio($scope.audioPause);

		$scope.audioPause = !$scope.audioPause;

	}

	function previousAudio() {

		if (service.audioManager.previousAudio()) {

			$scope.audioPause = false;

		}

	}

	function toggleEditorOpen() {

		$scope.hideEditor = !$scope.hideEditor;

	}

	/**
	 * Обработчик изменения кода в Ace.
	 */
	function aceChanged() {

		//

	}

	/**
	 * Инициализация Ace.
	 */
	function aceLoaded(editor) {

		service.setEditorSession(editor.getSession());

		aceService.initialize(editor, $scope.lesson.rules);

		markerService = aceService.getMarkerService();

		/**
		 * Инициализация урока.
		 */
		service.initialize({
			lessonId: $stateParams.id,
			scope:    $scope
		});
	}

	/**
	 * Очистка маркеров.
	 */
	function clearMarker() {

		var markerId = service.getMarkerId();

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

			if (errorLine) {

				// Указываем маркер
				markerId = markerService.setMarkerAndAnnotation(errorLine, error);

				// Сохраняем в сервисе.
				// В связи с использованием указаний в уроке.
				service.setMarkerId(markerId);

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

		// Аналогичная проверка ведется в service
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

			service.intiateRunByUserClick();

			// При запуске кода
			// выключаем окно инструкции.
			// Оно зависит от поля showTextContent.
			// ng-show = "showTextContent"
			$scope.showTextContent = false;
			$scope.showSettings = false;
		}
		else {

			service.stop();

		}

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
