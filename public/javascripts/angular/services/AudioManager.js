'use strict';

/**
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.audioManager', []);

app.factory('audioManager', ['$rootScope', function ($rootScope)
{
	var audio;
	var audioTwo;
	var nowPlay = 0;

	var playList = [
		{
			src: 'audio/track1.ogg',
			volume: 0.05
		},
		{
			src: 'audio/track3.ogg',
			volume: 0.05
		},
		{
			src: 'audio/track2.ogg',
			volume: 0.05
		}
	];

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
		audioTwo.pause();
	});

	function load(audio, playValue)
	{
		audio.setAttribute('src', playValue.src);
		audio.load();

		audio.volume = playValue.volume;
	}

	function playNext(audio, playList)
	{
		nowPlay = (nowPlay + 1) % playList.length;

		load(audio, playList[nowPlay]);

		audio.play();
	}

	function createWithPlayList()
	{
		if (!audioTwo)
		{
			audioTwo = new Audio();
		}

		load(audioTwo, playList[nowPlay]);

		audioTwo.onended = function()
		{
			playNext(audioTwo, playList);
		};

		return audioTwo;
	}

	return {
		create: create,
		createWithPlayList: createWithPlayList
	};
}]);
