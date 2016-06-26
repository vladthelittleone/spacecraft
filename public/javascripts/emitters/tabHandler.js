/**
 * Обработчик событий с ТЕКУЩЕЙ вкладкой.
 * На данный момент (25.06.2016) поддерживается отлов события
 * "ускользания" вкладки из вида пользователя (сворачанивание браузера,
 * смена вкладки).
 *
 * Created by greezlock on 25.06.16.
 */


var tabHandler = TabHandler();
module.exports = tabHandler;

// tabHandler - глобальный объект через который осуществляется добавление коллбэков.
// start - производит регистрацию на событие смены вкладки в браузере.
// subscribeOnTabHiddenOnce - добавляет фукнцию в подписчики на случай СКРЫТИЯ вкладки из вида пользовователя.
// subscribeOnTabShowOnce - добавляет функцию в подписчики на случай ПОЯВЛЕНИЯ вкладки на виду у пользователя.

function TabHandler() {

	var callbackType = {

		callOnce : 0,
		callEverytime : 1
	};

	var callbackPrepareResult = {

		none : 0,
		wasExecuted : 1
	};


	var status = {

		hidden : 0,
		visible : 1
	};

	// undefined
	var currentTabStatus;

	callbackWrapper = function( _callbackType, _callbackFunc ) {

		function CallbackWrapper() {

			this.callbackType = _callbackType;
			this.callbackFunc = _callbackFunc;
		}

		return new CallbackWrapper();
	};

	var hidden;
	var visibilityChange;
	var eventList = [[]];

	var tabHandler = {

		start : start,

		subscribeOnTabHiddenOnce : subscribeOnTabHiddenOnce,
		subscribeOnTabShowOnce : subscribeOnTabShowOnce,

		subscribeOnTabHidden : subscribeOnTabHidden,
		subscribeOnTabShow : subscribeOnTabShow,

		clear:clear
	};

	return tabHandler;



	function clear() {

		eventList.splice( 0,  eventList.length );
	}

	// Предварительная обработка коллбэка перед добавлением его в ОЧЕРЕДЬ.
	// данный метод не различает вид коллбэка.
	function prepareCallbackFunc( _status, _callbackFunc ) {

		var _prepareResult = callbackPrepareResult.none;
		if ( _status == currentTabStatus ) {

			_callbackFunc();
			_prepareResult = callbackPrepareResult.wasExecuted;
		}

		return _prepareResult;
	}


	function addCallbackToEventList( _status, _callbackFunc, _callbackType ) {

		if (typeof eventList[ _status ] == "undefined") {

			eventList[ _status ] = [];
		}

		eventList[ _status ].push( callbackWrapper( _callbackType, _callbackFunc) );

	}


	// Обработка ОДИНОЧНОГО коллбэка.
	function prepareOnceCallback( _status, _callbackFunc, _callbackType ) {

		var _prepareResult = prepareCallbackFunc( _status, _callbackFunc );
		// если результатом предварительной обработки коллбэка стало его ИСПОЛНЕНИЕ, и этот коллбэк является ОДНОРАЗОВЫМ,
		// то НЕ НУЖНО осуществлять добавление такого коллбэка в очередь.
		if ( _prepareResult !== callbackPrepareResult.wasExecuted ) {

			addCallbackToEventList( _status, _callbackFunc, _callbackType );
		}
	}


	// обработка ПОТСОЯННОГО коллбэка.
	function prepareEverytimeCallback( _status, _callbackFunc, _callbackType ) {

		prepareCallbackFunc( _status, _callbackFunc );
		addCallbackToEventList( _status, _callbackFunc, _callbackType);
	}


	function subscribeOnTabHiddenOnce( _callbackFunc ) {

		// обработка одиночных коллбэков особенна тем,
		// что если коллбэк будет исполнен ДО попадания в очередь (текущее состояние вкладки
		// равняется состоянию на которое коллбэк подписывался), то такой коллбэк НЕЛЬЗЯ добавлять в очередь.
		prepareOnceCallback( status.hidden, _callbackFunc, callbackType.callOnce );
	}

	function subscribeOnTabShowOnce( _callbackFunc ) {

			// обработка одиночных коллбэков особенна тем,
			// что если коллбэк будет исполнен ДО попадания в очередь (текущее состояние вкладки
			// равняется состоянию на которое коллбэк подписывался), то такой коллбэк НЕЛЬЗЯ добавлять в очередь.
		prepareOnceCallback( status.visible, _callbackFunc, callbackType.callOnce );
	}


	function subscribeOnTabShow( _callbackFunc ) {

		prepareEverytimeCallback( status.visible, _callbackFunc, callbackType.callEverytime);
	}

	function subscribeOnTabHidden( _callbackFunc ) {

		prepareEverytimeCallback( status.hidden, _callbackFunc, callbackType.callEverytime);
	}

	function prepareCallbackWrapperList( _callbackFuncList ) {

		if ( typeof _callbackFuncList !== "undefined" ) {

			for ( var i = 0; i  < _callbackFuncList.length; ) {

				var callbackWrapper = _callbackFuncList[ i ];

				if ( typeof callbackWrapper.callbackFunc == "function" ) {

					callbackWrapper.callbackFunc();

					// Если обработчик ОДНОРАЗОВЫЙ - удаляем его.
					if ( callbackWrapper.callbackType == callbackType.callOnce ) {

						// удаляем обертку коллбэка из списка:
						// The splice() method changes the content of an array by removing existing elements and/or adding new elements (документация).
						_callbackFuncList.splice( i, 1 );
					}
					else {

						i++;
					}
				}
			}
		}

	}


	function updateCurrentTabStatus() {

		currentTabStatus = ( document[ hidden ]  ) ? status.hidden :
												     status.visible;
	}


	function handleVisibilityChange() {

		updateCurrentTabStatus();
		prepareCallbackWrapperList( eventList[ currentTabStatus ] );
	}


	function start() {

		var startResult = false;

		if (typeof document.hidden !== "undefined") {
			// ?
			hidden = "hidden";
			visibilityChange = "visibilitychange";
		} else if (typeof document.mozHidden !== "undefined") {
			// Мозилла
			hidden = "mozHidden";
			visibilityChange = "mozvisibilitychange";
		} else if (typeof document.msHidden !== "undefined") {
			// IE
			hidden = "msHidden";
			visibilityChange = "msvisibilitychange";
		} else if (typeof document.webkitHidden !== "undefined") {
			// ?
			hidden = "webkitHidden";
			visibilityChange = "webkitvisibilitychange";
		}

		// Проверка на поддержку Page Visibility браузером.
		if ( typeof document.addEventListener !== "undefined" && typeof hidden !== "undefined") {

			startResult = true;
			updateCurrentTabStatus();
			document.addEventListener( visibilityChange, handleVisibilityChange, false );
		}

		return startResult;
	}
}
