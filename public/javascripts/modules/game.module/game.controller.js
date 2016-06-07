/**
 * Контрллер игрового окна.
 *
 * Created by vladthelittleone on 30.11.15.
 */
GameController.$inject = ['$scope', 'audioManager', 'connection', 'gameService', 'aceService'];

module.exports = GameController;

function GameController($scope, audioManager, connection, service, aceService) {

	var audio = audioManager.createWithPlayList();
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

	/**
	 * Переключение состояния кода.
	 */
	$scope.toggleCodeRun = function () {

		$scope.options.isCodeRunning = !$scope.options.isCodeRunning;

		// Сохраняем код только при нажатии на кнопку 'play'
		if ($scope.options.isCodeRunning) {

			connection.httpSaveCode($scope.options.code);

		}

	};

	/**
	 * Переключение состояния окна редактора.
	 */
	$scope.toggleEditorOpen = function () {

		$scope.hideEditor = !$scope.hideEditor;

	};

	/**
	 * Переключение состояния окна документации.
	 */
	$scope.toggleDocOpen = function () {

		$scope.hideDoc = !$scope.hideDoc;

	};

	/**
	 * Обработчик изменения кода в Ace.
	 */
	$scope.aceChanged = function () {

		$scope.options.code = editorSession.getDocument().getValue();

		service.setCode($scope.options.code);

	};

	/**
	 * Инициализация Ace.
	 */
	$scope.aceLoaded = function (editor) {

		editorSession = editor.getSession();

		markerService = aceService(editor, $scope.options.code);

		service.setCode($scope.options.code);

		service.initCode(function (data) {

			editorSession.setValue(data);

		});

	};

	/**
	 * Обработка ошибки при запуске пользовательского кода.
	 */
	$scope.$watch('options.error', function (value) {

		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);

		$scope.textBot = value;

		if (value) {

			var errorLine = $scope.options.error.stack.split(':')[6] - 2;

			$scope.textBot = errorWrapper(value);

			markerId = markerService.setMarkerAndAnnotation(editorSession, errorLine, $scope.options.error);

		}

	});

	/**
	 * При загрузке запускаем звук.
	 */
	$scope.$watch('$viewContentLoaded', function () {

		audio.play();

	});

	function errorWrapper(value) {

		return '<p>Неисправность!! EГГ0Г!!</p> ' +
			'<p>Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">0шибка: ' + value + '</p>' +
			'<p>Пожалуйста исправте ситуацию.</p>';

	}

}
