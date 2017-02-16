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

	function previousAudio() {

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

	/**
	 * Функция подписки на конкц аудиозаписи.
     */
	function onEnd(callback) {

		// По логике аудиозапись уже может быть закончена
		// в момент вызова onEnd.
		if (isAudioEnd) {

			callback();

		}

		onEndCallback = callback;

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
	 * Открытие предыдущего урока.
	 */
	function previous() {

		t.audioIndex = Math.max(t.audioIndex - 2, 0);

		initNextLessonContent();

	}
}
