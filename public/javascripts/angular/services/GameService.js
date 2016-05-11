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
		if(data)
		{
			callback(data);
		}
		else
		{
			connection.httpGetCodeFromJs(function (data)
			{
				callback(data);
			});
		}
	}

	var requestForCode = function (callback)
	{
		connection.httpGetCodeFromDB(function (code)
		{
			checkAndSaveCode(code.data, callback);
		});
	};

	return{
		getCode: getCode,
		setCode: setCode,
		requestForCode: requestForCode
	};
}]);
