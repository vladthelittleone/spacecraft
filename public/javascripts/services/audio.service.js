'use strict';

// Зависимости
var rand = require('../utils/random');

AudioManager.$inject = ['$rootScope'];

module.exports = AudioManager;

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

	var playList = [{
		src:    'audio/track1.ogg',
		volume: 0.05
	}, {
		src:    'audio/track3.ogg',
		volume: 0.05
	}, {
		src:    'audio/track2.ogg',
		volume: 0.05
	}];

	// Выполнение паузы при изменении ссылки.
	$rootScope.$on('$stateChangeSuccess', onStateChange);

	that.createVoice = createVoice;
	that.createSoundtrack = createSoundtrack;

	return that;

	/**
	 * Создание аудиозаписи голоса.
	 */
	function createVoice(str) {

		if (voice) {

			// Реинициализация
			voice.onended = null;

			// Изменение сурса
			voice.setAttribute('src', str);

			// Загрузка нового сурса
			voice.load();

		}
		else {

			// Создание новой аудиозаписи
			voice = new Audio(str);

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

		audio.setAttribute('src', config.src);

		audio.load();

		audio.volume = config.volume;

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
}
