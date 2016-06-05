/**
 * Created by Ivan on 07.05.2016.
 */

'use strict';

var app = angular.module('spacecraft.gameService', []);

app.factory('gameService', ['$storage', 'connection', function ($storage, connection)
{
	var getCode = function ()
	{
		return $storage.local.getItem('code') || "";
	};

	var setCode = function (code)
	{
		$storage.local.setItem('code', code);
	};

	function checkAndSaveCode(data, callback)
	{
		// Если пришел код из базы выполняем callback
		if(data)
		{
			callback(data);
		}
		else
		{
			// Если его нет берем из JS файла и выполняем callback
			connection.httpGetGameCodeFromJs(function (data)
			{
				callback(data);
			});
		}
	}

	var requestForCode = function (callback)
	{
		// Обращаемся к базе за кодом
		connection.httpGetCodeFromDataBase(function (code)
		{
			checkAndSaveCode(code.data, callback);
		});
	};

	function initCode(callback)
	{
		// Вытаскиваем код из  локалного хранилища
		var code = getCode();

		// Если в локальном хранилище нет кода
		if (!code)
		{
			// Делаем запрос на получение коду от других источников выполняем callback
			requestForCode(callback);
		}
		else
		{
			callback(code);
		}
	}

	return {
		getCode: getCode,
		setCode: setCode,
		requestForCode: requestForCode,
		initCode: initCode
	};
}]);
