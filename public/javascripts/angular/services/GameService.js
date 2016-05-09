/**
 * Created by Ivan on 07.05.2016.
 */

'use strict';

var app = angular.module('spacecraft.gameService', []);

app.factory('gameService', ['$storage', '$http', function ($storage, $http)
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
			$http({
				method: 'GET',
				url: 'javascripts/code/game.js'
			}).success(function (date)
			{
				callback(date);
				return date;
			});
		}
	}

	var requestForCode = function (callback)
	{
		var code = "";

		$http({
			method: 'GET',
			url: '/statistic/code'
		}).then(function(result)
		{
			code = checkAndSaveCode(result.data, callback);
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
