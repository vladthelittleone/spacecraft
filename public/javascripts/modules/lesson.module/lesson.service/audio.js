'use strict';

module.exports = AudioWrapper;

/**
 * Обертка доп. функционала вокруг AudioManager.
 */
function AudioWrapper(audioManager, previousCallback) {

	var audio;

	var t = {};

	t.audioIndex = 0; 	// Индекс текущиего трека

	/**
	 * Включить предыдущую дорожку.
	 */
	t.previousAudio = previousAudio;

	/**
	 * Переключатель аудио.
	 */
	t.toggleAudio = toggleAudio;

	t.play = play;
	t.pause = pause;
	t.onEnd = onEnd;
	t.create = create;
	t.isEnd = isEnd;

	return t;

	function previousAudio(callback) {

		// При определенном значение времени текущего трека
		// не переклчюаемся на предыдущий трек,
		// а начинаем сначала текущий.
		if (audio.currentTime / 5 < 1) {

			audio.pause();

			audio.currentTime = 0;

			previous();

			return true;

		}
		else {

			audio.currentTime = 0;

		}

	}

	function play() {

		audio.play();

	}

	function toggleAudio(audioPause) {

		if (audioPause) {

			audio.play();

		}
		else {

			audio.pause();

		}

	}

	function pause() {

		audio.pause();

	}

	function onEnd(callback) {

		if (audio.paused) {

			callback();

		}

		audio.onended = function () {

			audio.onended = null;

			callback();

		};

	}

	function isEnd() {

		return !audio.currentTime;

	}

	function create(a) {

		audio = audioManager.createVoice(a);

	}

	/**
	 * Открытие предыдущего урока.
	 */
	function previous() {

		t.audioIndex = Math.max(t.audioIndex - 2, 0);

		initNextLessonContent();

	}

}
