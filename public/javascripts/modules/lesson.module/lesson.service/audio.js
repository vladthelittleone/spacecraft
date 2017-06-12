'use strict';

module.exports = AudioWrapper;

/**
 * Обертка доп. функционала вокруг AudioManager.
 */
function AudioWrapper(audioManager, initNextLessonContent) {

	var audio;			// Сама аудиозапись
	var onEndCallback;	// Вызываемый в конце аудио коллбек
	var isAudioEnd;		// Закончилось ли аудио

	var t = {};


	t.audioIndex = 0; 	// Индекс текущиего трека

	/**
	 * Переключатель аудио.
	 */
	t.toggleAudio = toggleAudio;

	t.play = play;
	t.pause = pause;
	t.onEnd = onEnd;
	t.create = create;
	t.isEnd = isEnd;
	t.reset = reset;

	return t;

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

	/**
	 * Функция подписки на конец аудиозаписи.
     */
	function onEnd(callback) {

		// По логике аудиозапись уже может быть закончена
		// в момент вызова onEnd.
		if (isAudioEnd) {

			callback();

		} else {

			onEndCallback = callback;

		}

	}

	/**
	 * Закончилась ли аудиозапись?
     */
	function isEnd() {

		return isAudioEnd;

	}

	/**
	 * Создание новой аудиозаписи.
     */
	function create(a) {

		audio = audioManager.createVoice(a);

		// Аудио не закончено
		isAudioEnd = false;

		// Присваиваем коллбек
		// конца аудиозаписи.
		audio.onended = onEndCall;

		// Очищаем коллбек
		onEndCallback = null;

	}

	/**
	 * Вызов коллбека конца и установка флага конца в true.
	 */
	function onEndCall() {

		// Очищаем onEnded
		audio.onended = null;

		isAudioEnd = true;

		// Коллбек после очистки.
		// Так как может быть добавлен новый
		// audio.onended коллбек.
		onEndCallback && onEndCallback();

	}

	/**
	 * Начать урок заново.
	 */
	function reset() {

		t.audioIndex = 0;

		initNextLessonContent();

	}

}
