'use strict';

Connection.$inject = ['$http'];

module.exports = Connection;

/**
 * Ссылки на ресурсы.
 */
var resources = {
	lessonsCode: 'javascripts/code/lesson'
};

/**
 * Ссылки на REST API
 */
var links = {

	/**
	 * Сбор статистики.
	 */
	statistic: {
		lessons:     '/statistic/lessons',
		code:        '/statistic/code',
		stars:       '/statistic/lessons/stars',
		score:       '/statistic/score',
		leaderboard: '/statistic/lessons/leaderboard',
		progress:    '/statistic/user/progress'
	},

	user: {
		info: '/user/info'
	},

	/**
	 * Сбор метрик.
	 */
	metrics: {
		openLessons: 'metrics/openlessons'
	},

	/**
	 * Остальные ссылки
	 */
	register:     '/reg',
	logout:       '/logout',
	login:        '/login',
	checkSession: '/checkSession'

};

/**
 * Сервис взаимоедйствия с бекендом.
 *
 * Created by Ivan on 07.05.2016.
 */
function Connection ($http) {

	var that = {};

	that.saveCode = saveCode;

	that.getCodeFromDataBase = getCodeFromDataBase;
	that.getCodeFromJs = getCodeFromJs;

	that.getLessonCodeFromJs = getLessonCodeFromJs;

	that.getScore = getScore;

	that.saveLessonsStatistics = saveLessonsStatistics;
	that.getLessonsStatistics = getLessonsStatistics;

	that.lessonRate = lessonRate;

	that.getLeaderboard = getLeaderboard;

	that.login = login;
	that.logout = logout;
	that.register = register;

	that.getUserInfo = getUserInfo;

	that.getUserProgress = getUserProgress;
	that.updateUserProgress = updateUserProgress;

	that.checkSession = checkSession;

	that.metrics = {};
	that.metrics.hitOpenLesson = hitOpenLesson;

	return that;

	function checkSession (success, error) {

		$http({
				  url:    links.checkSession,
				  method: 'GET'
			  }).then(success, error);

	}

	function getUserInfo (callback) {

		$http({
				  url:    links.user.info,
				  method: 'GET'
			  }).then(callback);

	}

	function getLeaderboard (callback) {

		$http({
				  url:    links.statistic.leaderboard,
				  method: 'GET'
			  }).then(callback);

	}

	/**
	 * Сохранение статистики урока.
	 */
	function saveLessonsStatistics (args) {

		$http({
				  url:    links.statistic.lessons,
				  method: 'POST',
				  data:   args
			  });

	}

	/**
	 * Сохранение оценки урока.
	 */
	function lessonRate (lessonId, stars) {

		$http({
				  url:    links.statistic.stars,
				  method: 'POST',
				  data:   {
					  lessonId: lessonId,
					  stars:    stars
				  }
			  });

	}

	/**
	 * Сохранить код пользователя.
	 */
	function saveCode (data) {

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
	function getCodeFromDataBase (callback) {

		$http({
				  method: 'GET',
				  url:    links.statistic.code
			  }).then(callback);

	}

	/**
	 * Получить код из .js файла.
	 */
	function getCodeFromJs (source, callback) {

		$http({
				  method: 'GET',
				  url:    source
			  }).then(callback);

	}

	/**
	 * Получить код для урока из .js файла.
	 */
	function getLessonCodeFromJs (lessonId, subLessonId, callback) {

		var source = resources.lessonsCode + lessonId + '/' + subLessonId + '.js';

		getCodeFromJs(source, callback)

	}

	/**
	 * Статистика уроков.
	 */
	function getLessonsStatistics (callback) {

		$http.get(links.statistic.lessons).then(callback);

	}

	/**
	 * Вход в систему.
	 */
	function login (args) {

		var success = args.success;
		var error = args.error;

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
	function logout (success, error) {

		$http({
				  method: 'POST',
				  url:    links.logout
			  }).then(success, error);

	}

	/**
	 * Регистрация в сервисе.
	 */
	function register (args) {

		var success = args.success;
		var error = args.error;

		var p = $http({
						  method: 'POST',
						  data:   {
							  email:              args.email,
							  password:           args.password,
							  isSubscribeOnEmail: args.isSubscribeOnEmail
						  },
						  url:    links.register
					  });

		p.then(success, error);

	}

	/**
	 * Получить информацию об очках лучших пользователей.
	 */
	function getScore (callback) {

		$http.get(links.statistic.score).success(callback);

	}

	/**
	 * Отправка информации о открытии урока пользователем.
	 */
	function hitOpenLesson () {

		$http.post(links.metrics.openLessons);

	}

	function getUserProgress (callback) {

		$http.get(links.statistic.progress).then(callback);

	}

	function updateUserProgress (score, callback) {

		$http({
				  url:    links.statistic.progress,
				  method: 'POST',
				  data:   {
					  score: score
				  }
			  }).then(callback);
	}

}
