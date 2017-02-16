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

	// Список наших форматов аудио
	var formatList = ['mp3', 'ogg'];

	var supportedFormat;

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

		var format;

		if (voice) {

			// Реинициализация
			voice.onended = null;

			format = getSupportedFormat(voice);

			// Изменение сурса
			voice.setAttribute('src', str + format);

			// Загрузка нового сурса
			voice.load();

		}
		else {

			// Создание новой аудиозаписи
			voice = new Audio();

			format = getSupportedFormat(voice);

			voice.setAttribute('src', str + format)

		}

		return voice;

	}

	/**
	 * Загрущка аудиозаписи.
	 *
	 * @param audio аудиозапись
	 * @param config конфигурация аудиозаписи
	 */
	function init(audio, config) {

		var format = getSupportedFormat(audio);

		audio.setAttribute('src', config.src + format);

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
	 * Из листа форматов наших аудио и возвращает первый поддерживаемый
	 */
	function getSupportedFormat (audio) {

		// Если уже проверяли поддержу форматов до этого, то сразу возврашаем найденный до этого офрмат
		if (supportedFormat) {

			return '.' + supportedFormat;

		}

		lodash.forEach(formatList, function (format) {


			if (audio.canPlayType('audio/' + format) != '') {

				supportedFormat = format;

				return false; // Прекращаем forEach

			}

		});

		return '.' + supportedFormat;

	}
}
