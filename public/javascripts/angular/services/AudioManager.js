'use strict';

/**
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.audioManager', []);

app.factory('audioManager', ['$rootScope', function ($rootScope)
{
	var voice;
	var soundtrack;
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
		if (voice)
		{
			voice.onended = null;
			voice.setAttribute('src', str); // change the source
			voice.load(); // load the new source
		}
		else
		{
			voice = new Audio(str);
		}

		return voice;
	}

	$rootScope.$on('$stateChangeSuccess', function ()
	{
		voice && voice.pause();
		soundtrack && soundtrack.pause();
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
		if (!soundtrack)
		{
			soundtrack = new Audio();
		}

		var rIndex = utils.randomInt(0, playList.length - 1);

		load(soundtrack, playList[rIndex]);

		soundtrack.onended = function()
		{
			playNext(soundtrack, playList);
		};

		return soundtrack;
	}

	return {
		create: create,
		createWithPlayList: createWithPlayList
	};
}]);
