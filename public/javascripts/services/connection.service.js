'use strict';

Connection.$inject = ['$http'];

module.exports = Connection;

/**
 * Ссылки на ресурсы.
 */
var resources = {
	code:        'javascripts/code/game.js',
	lessonsCode: 'javascripts/code/lesson'
};

/**
 * Ссылки на REST API
 */
var links = {
	lessonStatistic: '/statistic/lessons',
	code:            '/statistic/code',
	register:        '/reg',
	logout:          '/logout',
	login:           '/login',
	loginCheck:      'login/check'
};

/**
 * Сервис взаимоедйствия с бекендом.
 *
 * Created by Ivan on 07.05.2016.
 */
function Connection($http) {

	var that = {};

	that.saveCode = saveCode;
	that.getCodeFromDataBase = getCodeFromDataBase;
	that.getCodeFromJs = getCodeFromJs;
	that.getGameCodeFromJs = getGameCodeFromJs;
	that.getLessonCodeFromJs = getLessonCodeFromJs;

	that.saveLessonStatistic = saveLessonStatistic;
	that.getLessonsStatistics = getLessonsStatistics;
	that.lessonRate = lessonRate;

	that.login = login;
	that.logout = logout;
	that.register = register;
	that.isLoggedIn = isLoggedIn;

	return that;

	/**
	 * Сохранение статистики урока.
	 */
	function saveLessonStatistic(args) {

		$http({
			url:    links.lessonStatistic,
			method: 'POST',
			data:   args
		});

	}

	/**
	 * Сохранение оценки урока.
	 */
	function lessonRate(lessonId, stars) {

		$http({
			url:    '/statistic/lessons/stars',
			method: 'POST',
			data:   {
				idLesson: lessonId,
				stars:    stars
			}
		});

	}

	/**
	 * Сохранить код пользователя.
	 */
	function saveCode(data) {

		$http({
			method: 'POST',
			url:    links.code,
			data:   {
				code: data
			}
		});

	}

	/**
	 * Получить код из базы данных.
	 */
	function getCodeFromDataBase(callback) {

		$http({
			method: 'GET',
			url:    links.code
		}).then(callback);

	}

	/**
	 * Получить код онлайн игры из .js файла.
	 */
	function getGameCodeFromJs(callback) {

		$http({
			method: 'GET',
			url:    resources.code
		}).then(callback);

	}

	/**
	 * Получить код из .js файла.
	 */
	function getCodeFromJs(source, callback) {

		$http({
			method: 'GET',
			url:    source
		}).then(callback);

	}

	/**
	 * Получить код для урока из .js файла.
	 */
	function getLessonCodeFromJs(lessonId, subLessonId, callback) {

		var source = resources.lessonsCode + lessonId + '/' + subLessonId + '.js';

		getCodeFromJs(source, callback)

	}

	/**
	 * Статистика уроков.
	 */
	function getLessonsStatistics(callback) {

		$http.get(links.lessonStatistic).then(callback);

	}

	/**
	 * Вход в систему.
	 */
	function login(success, error) {

		var promise = $http({
			method: 'POST',
			data:   {
				email:    args.email,
				password: args.password
			},
			url:    links.login
		});

		promise.then(success, error);
	}

	/**
	 * Выходи из системы.
	 */
	function logout(success, error) {

		$http({
			method: 'POST',
			url:    links.logout
		}).then(success, error);

	}

	/**
	 * Регистрация в сервисе.
	 */
	function register(args) {

		var success = args.success;
		var error = args.error;

		var p = $http({
			method: 'POST',
			data:   {
				email:    args.email,
				password: args.password
			},
			url:    links.register
		});

		p.then(success, error);

	}

	/**
	 * Проверка авторизации пользователя в системе.
	 */
	function isLoggedIn(args) {

		var success = args.success;
		var error = args.error;

		$http({
			method: 'GET',
			url:    links.loginCheck
		}).then(success, error);

	}
}
