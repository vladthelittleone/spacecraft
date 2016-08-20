/**
 * Обработчик событий с ТЕКУЩЕЙ вкладкой.
 * На данный момент (25.06.2016) поддерживается отлов события
 * "ускользания" вкладки из вида пользователя (сворачанивание браузера,
 * смена вкладки).
 *
 * Created by greezlock on 25.06.16.
 */

var Visibilityjs = require('visibilityjs');

module.exports = TabHandler();

function TabHandler() {

	var callbackType = {
		callOnce: 	   0,
		callEverytime: 1
	};

	var callbackPrepareResult = {
		none: 		 0,
		wasExecuted: 1
	};

	var status = {
		hidden:  0,
		visible: 1
	};

	var currentTabStatus;

	var hiddenList = [];
	var showList = [];

	var tabHandler = {};

	tabHandler.start = start;
	tabHandler.clear = clear;
	tabHandler.subscribeOnTabHiddenOnce = subscribeOnTabHiddenOnce;
	tabHandler.subscribeOnTabShowOnce = subscribeOnTabShowOnce;
	tabHandler.subscribeOnTabHidden = subscribeOnTabHidden;
	tabHandler.subscribeOnTabShow = subscribeOnTabShow;
	tabHandler.executeHiddenCallbacks = executeHiddenCallbacks;
	tabHandler.executeShowCallbacks = executeShowCallbacks;

	// Подписываемся на событие по вкладке.
	tabHandler.start();

	return tabHandler;

	/**
	 * Обертка коллбэка для добавления его в очередь.
	 * Именно благодаря обертке, при обработке очереднного коллбэка из очереди,
	 * определяется его тип.
	 *
	 * @param _callbackType тип коллбэка: одноразовый; постоянный.
	 * @param _callbackFunc сам коллбэк.
	 * @param pre коллбек выполняющийся перед обновлением
     */
	function callbackWrapper( _callbackType, _callbackFunc ) {

		var _callbackWrapper = {
			callbackType: _callbackType,
			callbackFunc:_callbackFunc
		};

		return _callbackWrapper;

	}

	/**
	 * Явно инициируем вызов коллбэков, которые подписались на событие
	 * СКРЫТИЯ вкладки.
	 */
	function executeHiddenCallbacks() {

		prepareCallbackWrapperList( hiddenList );
	}

	/**
	 * Явно инициируем вызов коллбэков, которые подписались на событие
	 * ПОЯВЛЕНИЯ вкладки.
	 */
	function executeShowCallbacks() {

		prepareCallbackWrapperList( showList );
	}

	/**
	 * Очистка ВСЕХ коллбэков из очереди.
	 */
	function clear() {

		hiddenList.splice( 0, hiddenList.length );
		showList.splice( 0,  showList.length );

	}

	/**
	 * Предварительная обработка коллбэка перед добавлением его в ОЧЕРЕДЬ.
	 * Данный метод не различает вид коллбэка.
     */
	function prepareCallbackFunc( _status, _callbackFunc ) {

		var _prepareResult = callbackPrepareResult.none;

		if ( _status == currentTabStatus ) {

			_callbackFunc();
			_prepareResult = callbackPrepareResult.wasExecuted;

		}

		return _prepareResult;

	}

	function addCallbackToEventList( _status, _callbackFunc, _callbackType ) {

		var _callbackWrapper = callbackWrapper( _callbackType, _callbackFunc);
		(_status == status.hidden) ? hiddenList.push(_callbackWrapper):
									 showList.push( _callbackWrapper );

	}

	/**
	 * Обработка ОДИНОЧНОГО коллбэка.
 	 */
	function prepareOnceCallback( _status, _callbackFunc, _callbackType ) {

		var _prepareResult = prepareCallbackFunc( _status, _callbackFunc );
		// если результатом предварительной обработки коллбэка стало его ИСПОЛНЕНИЕ, и этот коллбэк является ОДНОРАЗОВЫМ,
		// то НЕ НУЖНО осуществлять добавление такого коллбэка в очередь.
		if ( _prepareResult !== callbackPrepareResult.wasExecuted ) {

			addCallbackToEventList( _status, _callbackFunc, _callbackType );

		}
	}

	/**
	 * обработка ПОТСОЯННОГО коллбэка.
     */
	function prepareEverytimeCallback( _status, _callbackFunc, _callbackType ) {

		prepareCallbackFunc( _status, _callbackFunc );
		addCallbackToEventList( _status, _callbackFunc, _callbackType);
	}

	/**
	 * Добавление в очередь ОДИНОЧНОГО коллбэка на событие скрытия вкладки.
	 * Обработка одиночных коллбэков особенна тем,
	 * что если коллбэк будет исполнен ДО попадания в очередь (текущее состояние вкладки
	 * равняется состоянию на которое коллбэк подписывался), то такой коллбэк НЕЛЬЗЯ добавлять в очередь.
     */
	function subscribeOnTabHiddenOnce( _callbackFunc ) {

		prepareOnceCallback( status.hidden, _callbackFunc, callbackType.callOnce );

	}

	/**
	 * Добавление в очередь ОДИНОЧНОГО коллбэка на событие появления вкладки.
	 * Все в точности с методом subscribeOnTabHiddenOnce, только событие другое.
	 */
	function subscribeOnTabShowOnce( _callbackFunc ) {

		prepareOnceCallback( status.visible, _callbackFunc, callbackType.callOnce );

	}

	/**
	 * Добавление в очередь ПОСТОЯННОГО коллбэка на событие скрытия вкладки.
     */
	function subscribeOnTabShow( _callbackFunc ) {

		prepareEverytimeCallback( status.visible, _callbackFunc, callbackType.callEverytime);

	}

	/**
	 * Добавление в очередь ПОСТОЯННОГО коллбэка на событие появления вкладки.
	 */
	function subscribeOnTabHidden( _callbackFunc ) {

		prepareEverytimeCallback( status.hidden, _callbackFunc, callbackType.callEverytime);

	}

	/**
	 * Обработка списка коллбэков (точнее оберток, но самой сути это не меняет).
	 * Данный метод берет на себя обязанность вызвать ВСЕ имеющиеся коллбэки.
	 * Т.е. подразумевается, что сюда передается список оберток тех коллбэков,
	 * которым нужно передавать управление.
	 * Также, метод предусматривает наличие ОДИНОЧНЫХ коллбэков (благодаря обертке),
	 * и производит их удаление, так как по своей семантике повторным вызовам они не подлежат.
     */
	function prepareCallbackWrapperList( _callbackFuncList ) {

		if (_callbackFuncList) {

			for (var i = 0; i  < _callbackFuncList.length;) {

				var callbackWrapper = _callbackFuncList[ i ];

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

	/**
	 * Обновление текущего статуса вкладки.
	 * Текущий статус вкладки необходимо учитывать,
	 * так как те коллбэки, которые подписываются на состояние,
	 * которым в данный момент обладает вкладка, должны сразу исполняться.
	 * К примеру, если вкладка сейчас скрыта, и на это же событие подписывается
	 * голос, то останов этого голоса необходимо произвести СРАЗУ, в противном случае
	 * он будет воспроизводиться.
	 */
	function updateCurrentTabStatus() {

		currentTabStatus = Visibilityjs.hidden() ? status.hidden :
			                                       status.visible;

	}

	/**
	 * Обработчик, который вызывается на событие,
	 * по вкладке: вкладка скрылась; вкладка получила активность.
	 */
	function currentStatusTabChange() {

		updateCurrentTabStatus();

		var  _callbackFuncList = (currentTabStatus == status.hidden) ? hiddenList :
			  														   showList;
		prepareCallbackWrapperList(_callbackFuncList);

	}

	/**
	 * Метод организует подписку на событие браузера,
	 * по смене состояния вкладки.
     */
	function start() {

		Visibilityjs.change( currentStatusTabChange );
		updateCurrentTabStatus();

	}

}
