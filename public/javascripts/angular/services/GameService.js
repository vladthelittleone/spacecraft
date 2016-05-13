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
			connection.httpGetCodeFromJs(function (data)
			{
				callback(data);
			});
		}
	}

	var requestForCode = function (callback)
	{
		// Обращаемся к базе за кодом
		connection.httpGetCodeFromDB(function (code)
		{
			checkAndSaveCode(code.data, callback);
		});
	};

	return {
		getCode: getCode,
		setCode: setCode,
		requestForCode: requestForCode
	};
}]);
