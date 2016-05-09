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

	var getTipsAndTricks = function ()
	{
		return $storage.local.getItem('tipsAndTricks');
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
			return data;
		}
		else
		{
			connection.getCodeFromJs(function (data)
			{
				callback(data);
				return data;
			});
		}
	}

	var requestForCode = function (callback)
	{
		var code = "";

		code = connection.getCodeFromDB(function (code)
		{
			return checkAndSaveCode(code.data, callback);
		});

		return code;
	};

	return{
		getCode: getCode,
		getTipsAndTricks: getTipsAndTricks,
		setCode: setCode,
		requestForCode: requestForCode
	};
}]);
