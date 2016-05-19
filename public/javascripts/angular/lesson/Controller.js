/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.lesson');

app.controller('LessonController', ['$scope', '$stateParams', '$state', '$http', 'lessonService',
	'lessonProvider', 'interpreter', 'audioManager', 'connection', 'aceService', 'markerService',
	function ($scope, $stateParams, $state, $http, lessonService,lessonProvider, interpreter, audioManager, connection, aceService, markerService)
{
	var markerId;

	$scope.starsHide = false;
	$scope.idLesson = $stateParams.id;

	function current()
	{
		return $scope.lesson.sub[$scope.subIndex];
	}

	function error(message)
	{
		$scope.textBot = message;

		// Удаляем кнопку 'Далее' тк получили ошибку.
		$scope.nextSubLesson = null;
	}

	function success(message)
	{

		$scope.textBot = message;

		// Добавляем ссылку на функцию и кнопку 'Далее'
		$scope.nextSubLesson = nextSubLesson;
	}

	function nextSubLesson()
	{
		options.nextSubLesson = true;
		options.isCodeRunning = false;

		// Размер массива подуроков с 0
		var len = $scope.lesson.sub.length - 1;

		// Индекс текущего подурока
		var i = $scope.subIndex;

		// Текущий объект статистики уроков
		var l = lessonService.getLessons();

		if (i !== len)
		{
			options.code = initCode(++$scope.subIndex);

			// Устанавливаем текущий урок в хранилище
			lessonService.setLesson(l, $scope.subIndex, len);

			connection.httpSaveStatisticLesson({
				lessonId: $stateParams.id,
				size: len,
				current: $scope.subIndex
			});

			lessonService.nextAudio($scope, current());
		}
		else
		{
			// Устанавливаем текущий урок в хранилище
			lessonService.setLesson(l, 0, len, true);

			connection.httpSaveStatisticLesson({
				lessonId: $stateParams.id,
				size: len,
				current: 0,
				completed: true
			});

			$scope.starsHide = true;
		}

		audioIndex = 0;
		$scope.textContent = false;
	}

	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);

	function initialize(id)
	{
		// Получаем урок из локального хранилища
		var ls = lessonService.getCurrentLesson(id);
		$scope.subIndex = 0;

		if(!ls)
		{
			// Идем в базу за статой по урокам
			connection.httpGetLessonFromDb(function(result)
			{
				if(result.data[id])
				{
					// Индекс под урока
					$scope.subIndex = parseInt(result.data[id].current);
				}

				initCode($scope.subIndex);
			});
		}
		else
		{
			$scope.subIndex = ls;
			initCode(ls);
		}
	}

	initialize($stateParams.id);

	//===================================
	//============== CODE ===============
	//===================================

	var options = $scope.options =
	{
		isCodeRunning: false,
		code: '',
		error: null
	};

	function initCode(i)
	{
		connection.getCodeLessonFromJs(i, $stateParams.id, function (date)
		{
			editorSession.setValue(date);
			options.code = date;

			// Слова BBot'а
			$scope.textBot = current().defaultBBot && current().defaultBBot();
			$scope.isGameLesson = $scope.lesson.isGameLesson;
			$scope.nextSubLesson = nextSubLesson;

			lessonService.nextAudio($scope, current());
		});
	}


	//===================================
	//============== SCOPE ==============
	//===================================

	// Вся информация о уроке
	$scope.lesson = lessonProvider($stateParams.id);
	$scope.hideEditor = false;
	$scope.audioPause = false;
	$scope.textContent = false;
	$scope.hint = false;

	// Проверка существования урока
	if (!$scope.lesson)
	{
		$state.go('lessons');
	}

	$scope.run = lessonService.codeRun($scope, options, current());

	$scope.toggleTextContent = function ()
	{
		$scope.textContent = !$scope.textContent;
	};

	$scope.toggleAudioPause = lessonService.toggleAudioPause($scope);


	$scope.previousAudio = lessonService.previousAudio($scope, current());


	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
	};

	//===================================
	//============== EDITOR =============
	//===================================

	var editorSession;

	$scope.aceChanged = function ()
	{
		options.code = editorSession.getDocument().getValue();
	};

	$scope.aceLoaded = function (editor)
	{
		editorSession = editor.getSession();

		aceService.initializeAceSettings(editor, options.code);
	};

	function errorWrapper (value)
	{
		return '<p>### Неисправность!! EГГ0Г!!</p> ' +
			'<p>### Дроид BBot не может понятb к0д 4еловека.</p>' +
			'<p class="red-label">### 0шибка: ' + value + '</p>' +
			'<p>### Пожалуйста исправте ситуацию.</p>';
	}

	$scope.$watch('options.error', function (value)
	{
		markerId && markerService.deleteMarkerAndAnnotation(editorSession, markerId);
		$scope.textBot = value;

		if (value)
		{
			var foundedStringNumb = $scope.options.error.stack.split(':')[6] - 2;

			$scope.textBot = errorWrapper(value);

			markerId = markerService.setMarkerAndAnnotation(editorSession, foundedStringNumb, $scope.options.error);
		}
	});

	//===================================
	//============== AUDIO ==============
	//===================================

	var soundtrack = audioManager.createWithPlayList();

	$scope.$watch ('$viewContentLoaded', function()
	{
		soundtrack.play();
	});
}]);
