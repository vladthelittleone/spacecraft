'use strict';

// Зависимости
var rand = require('../utils/random');

AudioManager.$inject = ['$rootScope'];

module.exports = AudioManager;

var lodash = require('lodash');

/**
 * Менеджер аудиоменеджеров.
 *
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
function AudioManager($rootScope) {

	var that = {};

	var voice;
	var soundtrack;
	var currentAudio = 0;

	var audioFormat = tryToGetSupportedAudioFormat();

	var playList = [{
		src:    'audio/track1',
		volume: 0.05
	}, {
		src:    'audio/track3',
		volume: 0.05
	}, {
		src:    'audio/track2',
		volume: 0.05
	}];

	// Выполнение паузы при изменении ссылки.
	$rootScope.$on('$stateChangeSuccess', onStateChange);

	that.createVoice = createVoice;
	that.createSoundtrack = createSoundtrack;

	that.pauseAllSounds = pauseAllSounds;
	that.pauseVoice = pauseVoice;
	that.pauseSoundtrack = pauseSoundtrack;

	that.resumeAllSounds = resumeAllSounds;
	that.resumeVoice = resumeVoice;
	that.resumeSoundtrack = resumeSoundtrack;

	return that;

	/**
	 * Создание аудиозаписи голоса.
	 */
	function createVoice(str) {

		if (voice) {

			// Реинициализация
			voice.onended = null;

			// Изменение сурса
			voice.setAttribute('src', str + audioFormat);

			// Загрузка нового сурса
			voice.load();

		}
		else {

			// Создание новой аудиозаписи
			voice = new Audio();

			voice.setAttribute('src', str + audioFormat);

		}

		return voice;

	}

	/**
	 * Загрузка аудиозаписи.
	 *
	 * @param audio аудиозапись
	 * @param config конфигурация аудиозаписи
	 */
	function init(audio, config) {

		audio.setAttribute('src', config.src + audioFormat);

		audio.load();

		audio.volume = config.volume;

	}



	function pauseSoundtrack() {

		 soundtrack.pause();
	}

	function resumeSoundtrack() {

		soundtrack.play();
	}

	function pauseVoice() {

 		voice.pause();
	}

	function resumeVoice() {


		voice.play();
	}


	function pauseAllSounds() {

		pauseSoundtrack();
		pauseVoice();
	}

	function resumeAllSounds() {

		resumeSoundtrack();
		resumeVoice();
	}

	/**
	 * Запуск следующей аудиозаписи.
	 *
	 * @param audio
	 * @param list
	 */
	function playNext(audio, list) {

		currentAudio = (currentAudio + 1) % list.length;

		init(audio, list[currentAudio]);

		audio.play();
	}

	/**
	 * Создание саундтрек.
	 */
	function createSoundtrack() {

		if (!soundtrack) {

			soundtrack = new Audio();

		}

		var random = rand.randomInt(0, playList.length - 1);

		init(soundtrack, playList[random]);

		// В конце аудиозаписи, переключение
		// на следующий трек.
		soundtrack.onended = function () {

			playNext(soundtrack, playList);

		};

		return soundtrack;
	}

	function onStateChange() {

		voice && voice.pause();

		soundtrack && soundtrack.pause();

	}

	/**
	 * Функция производит проверку поддерживаемых форматов
	 * Из контейнера форматов наших аудио и возвращает поддерживаемый
	 */
	function tryToGetSupportedAudioFormat () {

		var audio = new Audio();

		var supportedAudioFormats = ['ogg', 'mp3'];

		return '.' + lodash.find(supportedAudioFormats, function (format) {

			return audio.canPlayType('audio/' + format);

		});

	}
}
