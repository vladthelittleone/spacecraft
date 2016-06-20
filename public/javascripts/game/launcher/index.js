'use strict';

// Экспорт
module.exports = CodeLauncher();

/**
 * Сервис запуска кода в игре.
 *
 * Created by vladthelittleone on 21.10.15.
 */
function CodeLauncher () {

	// that / this
	var t = {};

	/**
	 * Объект, который запускает код;
	 */
	var runner;

	t.run = run;
	t.stop = stop;
	t.setRunner = setRunner;

	return t;

	/**
	 * Запуск кода.
	 *
	 * @param code код
	 * @param post коллбек выполняющийся при обновлении игры
	 * @param pre коллбек выполняющийся перед обновлением
	 */
	function run(code, post, pre) {

		t.isCodeRunning = true;

		runner && runner.runCode(code, post, pre);

	}

	/**
	 * Остановить код.
	 */
	function stop() {

		t.isCodeRunning = false;

	}

	/**
	 * Установить объект, который запускает код.
     */
	function setRunner(v) {

		runner = v;

		t.setArguments = runner.setArguments;

	}

}
