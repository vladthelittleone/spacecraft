'use strict';

GameService.$inject = ['$storage', 'connection'];

module.exports = GameService;

/**
 * Сервис бизнес-логики контроллера игры.
 *
 * Created by Ivan on 07.05.2016.
 *
 * @see GameController
 */
function GameService($storage, connection) {

	var that = {};

	that.getCode = getCode;
	that.setCode = setCode;
	that.requestForCode = requestForCode;
	that.initCode = initCode;

	return that;

	// Код из лок. хранилища
	function getCode() {

		return $storage.local.getItem('code') || "";

	}

	// Установка кода в лок. хранилище
	function setCode(code) {

		$storage.local.setItem('code', code);

	}

	/**
	 * Запрос кода.
	 *
	 * @param callback, который выполняется при получении данных.
	 */
	function requestForCode(callback) {

		// Обращаемся к базе за кодом
		connection.httpGetCodeFromDataBase(function (code) {

			var data = code.data;

			// Если пришел код из базы, выполняем callback
			if (data) {

				callback(data);

			}
			else {

				// Если его нет, берем из .js файла код и выполняем callback
				connection.httpGetGameCodeFromJs(function (data) {

					callback(data);

				});

			}

		});

	}


	/**
	 * Инициализация кода.
	 *
	 * @param callback, в который будет передан полученный код.
	 */
	function initCode(callback) {

		// Получаем код из  локалного хранилища
		var code = getCode();

		// Если в локальном хранилище нет кода
		if (!code) {

			// Делаем запрос на получение кода от других источников
			requestForCode(callback);

		}
		else {

			// Если код есть выполняем передачу в callback
			callback(code);

		}

	}

}
