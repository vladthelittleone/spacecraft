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
		info:    '/user/info',
		session: '/user/session'
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
	register: '/reg',
	logout:   '/logout',
	login:    '/login'

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

	function claimHttpDataOnly(callback) {

		return function (response) {

			return callback && callback(response.data);

		}

	}


	function checkSession(success, error) {

		$http({
				  url:    links.user.session,
				  method: 'GET'
			  }).then(success, error);

	}

	function getUserInfo(success, error) {

		$http({
				  url:    links.user.info,
				  method: 'GET'
			  }).then(function (response) {

						  success(response.data);

					  },
					  error);

	}

	function getLeaderboard(success, error) {

		$http({
				  url:    links.statistic.leaderboard,
				  method: 'GET'
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));

	}

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
					  lessonId: lessonId,
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

		var source = resources.lessonsCode + lessonId + '/' + subLessonId + '.code';

		getCodeFromJs(source, callback)

	}

	/**
	 * Статистика уроков.
	 */
	function getLessonsStatistics(success, error) {

		$http.get(links.statistic.lessons).then(claimHttpDataOnly(success),
												claimHttpDataOnly(error));

	}

	/**
	 * Вход в систему.
	 */
	function login(data, success, error) {

		$http({
				  method: 'POST',
				  data:   data,
				  url:    links.login
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));
	}

	/**
	 * Выходи из системы.
	 */
	function logout(success, error) {

		$http({
				  method: 'POST',
				  url:    links.logout
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));

	}

	/**
	 * Регистрация в сервисе.
	 */
	function register(args) {

		$http({
				  method: 'POST',
				  data:   {
					  email:              args.email,
					  password:           args.password,
					  isSubscribeOnEmail: args.isSubscribeOnEmail
				  },
				  url:    links.register
			  }).then(claimHttpDataOnly(args.success),
					  claimHttpDataOnly(args.error));

	}

	/**
	 * Получить информацию об очках лучших пользователей.
	 */
	function getScore(callback) {

		$http.get(links.statistic.score).success(callback);

	}

	/**
	 * Отправка информации о открытии урока пользователем.
	 */
	function hitOpenLesson() {

		$http.post(links.metrics.openLessons);

	}

	function getUserProgress(success, error) {

		$http.get(links.statistic.progress).then(claimHttpDataOnly(success),
												 claimHttpDataOnly(error));

	}

	function updateUserProgress(score, callback) {

		$http({
				  url:    links.statistic.progress,
				  method: 'POST',
				  data:   {
					  score: score
				  }
			  }).then(callback);
	}

}
