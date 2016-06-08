'use strict';

/**
 * Контрллер игрового окна.
 *
 * Created by vladthelittleone on 30.11.15.
 */
GameController.$inject = ['$scope', 'audioManager', 'connection', 'gameService', 'aceService'];

module.exports = GameController;

function GameController($scope, audioManager, connection, service, aceService) {

	var editorSession;
	var markerService;
	var markerId;

	$scope.hideEditor = false;
	$scope.hideDoc = true;
	$scope.textBot = '';
	$scope.options =
	{
		isCodeRunning: false,
		code:          "",
		error:         null
	};

	$scope.toggleCodeRun = toggleCodeRun;
	$scope.toggleEditorOpen = toggleEditorOpen;
	$scope.toggleDocOpen = toggleDocOpen;
	$scope.aceChanged = aceChanged;
	$scope.aceLoaded = aceLoaded;

	$scope.$watch('options.error', onError);
	$scope.$watch('$viewContentLoaded', onContentLoaded);

	// ==================================================

	/**
	 * Переключение состояния кода.
	 */
	function toggleCodeRun() {

		$scope.options.isCodeRunning = !$scope.options.isCodeRunning;

		// Сохраняем код только при нажатии на кнопку 'play'
		if ($scope.options.isCodeRunning) {

			connection.saveCode($scope.options.code);

		}

	}

	/**
	 * Переключение состояния окна редактора.
	 */
	function toggleEditorOpen() {

		$scope.hideEditor = !$scope.hideEditor;

	}

	/**
	 * Переключение состояния окна документации.
	 */
	function toggleDocOpen() {

		$scope.hideDoc = !$scope.hideDoc;

	}

	/**
	 * Обработчик изменения кода в Ace.
	 */
	function aceChanged() {

		$scope.options.code = editorSession.getDocument().getValue();

		service.setCode($scope.options.code);

	}

	/**
	 * Инициализация Ace.
	 */
	function aceLoaded(editor) {

		editorSession = editor.getSession();

		aceService.initialize(editor, $scope.options.code);

		markerService = aceService.getMarkerService();

		// Установка кода
		service.setCode($scope.options.code);

		// Инициализация кода
		service.initCode(function (data) {

			editorSession.setValue(data);

		});

	}

	/**
	 * Обработка ошибки при запуске пользовательского кода.
	 */
	function onError(value) {

		// Удаляем старый маркер
		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);

		// Выводим текст
		$scope.textBot = value;

		if (value) {

			// Номер ошибки кода
			var errorLine = $scope.options.error.stack.split(':')[6] - 2;

			// Выводим ошибку
			$scope.textBot = errorWrapper(value);

			// Указываем маркер
			markerId = markerService.setMarkerAndAnnotation(editorSession, errorLine, $scope.options.error);

		}

	}

	/**
	 * При загрузке запускаем звук.
	 */
	function onContentLoaded() {

		audioManager.createSoundtrack().play();

	}

	function errorWrapper(value) {

		return '<p>Неисправность!! EГГ0Г!!</p> ' +
			'<p>Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">0шибка: ' + value + '</p>' +
			'<p>Пожалуйста исправте ситуацию.</p>';

	}

}
