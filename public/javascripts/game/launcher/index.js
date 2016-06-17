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
	 * @param callback коллбек выполняющийся при обновлении игры
	 */
	function run(code, callback) {

		t.isCodeRunning = true;

		runner && runner.runCode(code, callback);

	}

	/**
	 * Остановить код.
	 */
	function stop() {

		t.isCodeRunning = false;

		runner && runner.stopCode();

	}

	/**
	 * Установить объект, который запускает код.
     */
	function setRunner(v) {

		runner = v;

		t.setArguments = runner.setArguments;

	}

}
