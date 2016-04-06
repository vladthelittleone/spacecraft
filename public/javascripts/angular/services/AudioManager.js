'use strict';

/**
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.audioManager', []);

app.factory('audioManager', ['$rootScope', function ($rootScope)
{
	var audio;

	function create(str)
	{
		if (audio)
		{
			audio.onended = null;
			audio.setAttribute('src', str); //change the source
			audio.load(); //load the new source
		}
		else
		{
			audio = new Audio(str);
		}

		return audio;
	}

	$rootScope.$on('$stateChangeSuccess', function ()
	{
		audio.pause();
	});

	return {
		create: create
	};
}]);
