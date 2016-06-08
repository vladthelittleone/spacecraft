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

	/**
	 * Сбор статистики.
	 */
	statistic:   {
		main:    '/statistic',
		lessons: '/statistic/lessons',
		code:    '/statistic/code',
		stars:   '/statistic/lessons/stars',
		score:   '/statistic/score'
	},

	/**
	 * Сбор метрик.
	 */
	metrics: {
		openGame:    'metrics/opengame',
		openLessons: 'metrics/openlessons'
	},

	/**
	 * Остальные ссылки
	 */
	register:    '/reg',
	logout:      '/logout',
	login:       '/login',
	loginCheck:  'login/check'

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

	that.saveGameStatistics = saveGameStatistics;
	that.getGameStatistics = getGameStatistics;
	that.getScore = getScore;

	that.saveLessonsStatistics = saveLessonsStatistics;
	that.getLessonsStatistics = getLessonsStatistics;
	that.lessonRate = lessonRate;

	that.login = login;
	that.logout = logout;
	that.register = register;
	that.isLoggedIn = isLoggedIn;

	that.metrics = {};
	that.metrics.hitOpenGame = hitOpenGame;
	that.metrics.hitOpenLesson = hitOpenLesson;

	return that;

	/**
	 * Сохранение статистики урока.
	 */
	function saveLessonsStatistics(args) {

		$http({
			url:    links.statistic.lessons,
			method: 'POST',
			data:   args
		});

	}

	/**
	 * Сохранение оценки урока.
	 */
	function lessonRate(lessonId, stars) {

		$http({
			url:    links.statistic.stars,
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
			url:    links.statistic.code,
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
			url:    links.statistic.code
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

		$http.get(links.statistic.lessons).then(callback);

	}

	/**
	 * Статистика игры.
	 */
	function saveGameStatistics(player) {

		$http({
			url:    links.statistic.main,
			method: 'POST',
			data:   {
				killEnemy:    player.getKillEnemy(),
				takenBonus:   player.getTakenBonus(),
				totalScore:   player.getTotalScore(),
				acceptDamage: player.getAcceptDamage(),
				takenDamage:  player.getTakenDamage()
			}
		});

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

	/**
	 * Формирование игровой статистики.
	 */
	function getGameStatistics(callback) {

		$http.get(links.statistic.main).success(callback);

	}

	/**
	 * Получить информацию об очках лучших пользователей.
	 */
	function getScore(callback) {

		$http.get(links.statistic.score).success(callback);

	}

	/**
	 * Отправка информации о открытии игры пользователем.
	 */
	function hitOpenGame() {

		$http.post(links.metrics.openGame);

	}

	/**
	 * Отправка информации о открытии урока пользователем.
	 */
	function hitOpenLesson() {

		$http.post(links.metrics.openLessons);

	}
}
