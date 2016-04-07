'use strict';

/**
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.audioManager', []);

app.factory('audioManager', ['$rootScope', function ($rootScope)
{
	var audio;
	var nowPlay = 0;

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

		$rootScope.$on('$stateChangeSuccess', function ()
		{
			audio.pause();
		});

		return audio;
	}

	function playNext(audio, playList)
	{
		nowPlay %= playList.length;
		audio.setAttribute('src', playList[nowPlay].src);
		audio.load();

		audio.volume = playList[nowPlay].volume;

		audio.play();
	}

	function createWithPlayList(playList)
	{
		var audio = create(playList[nowPlay].src);

		audio.volume = playList[nowPlay].volume;

		audio.onended = function()
		{
			playNext(audio, playList);
		};

		return audio;
	}

	return {
		create: create,
		createWithPlayList: createWithPlayList
	};
}]);
