'use strict';

Connection.$inject = ['$http'];

module.exports = Connection;

/**
 * Ссылки на REST API
 */
var apiUrls = require('./../utils/json/urls/api.json');
var staticUrls = require('./../utils/json/urls/static.json');

/**
 * Сервис взаимоедйствия с бекендом.
 *
 * Created by Ivan on 07.05.2016.
 */
function Connection($http) {

	var that = {};

	that.getCodeFromJs = getCodeFromJs;

	that.getLessonCodeFromJs = getLessonCodeFromJs;

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

	return that;

	function claimHttpDataOnly(callback) {

		return function (response) {

			return callback && callback(response.data);

		}

	}

	function checkSession(success, error) {

		$http({
				  url:    apiUrls.user.info.session.root,
				  method: 'GET'
			  }).then(success, error);

	}

	function getUserInfo(success, error) {

		$http({
				  url:    apiUrls.user.info.email.root,
				  method: 'GET'
			  }).then(function (response) {

						  success(response.data);

					  },
					  error);

	}

	function getLeaderboard(success, error) {

		$http({
				  url:    apiUrls.statistics.lessons.leaderBoard.root,
				  method: 'GET'
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));

	}

	/**
	 * Сохранение статистики урока.
	 */
	function saveLessonsStatistics(args) {

		$http({
				  url:    apiUrls.user.statistics.lessons.root,
				  method: 'POST',
				  data:   args
			  });

	}

	/**
	 * Сохранение оценки урока.
	 */
	function lessonRate(lessonId, stars) {

		$http({
				  url:    apiUrls.user.statistics.lessons.stars.root,
				  method: 'POST',
				  data:   {
					  lessonId: lessonId,
					  stars:    stars
				  }
			  });

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

		var source = staticUrls.resources.lessonsCode.root + lessonId + '/' + subLessonId + '.js';

		getCodeFromJs(source, callback)

	}

	/**
	 * Статистика уроков.
	 */
	function getLessonsStatistics(success, error) {

		$http.get(apiUrls.user.statistics.lessons.root).then(claimHttpDataOnly(success),
															 claimHttpDataOnly(error));

	}

	/**
	 * Вход в систему.
	 */
	function login(data, success, error) {

		$http({
				  method: 'POST',
				  data:   data,
				  url:    apiUrls.user.sign.in.email.root
			  }).then(claimHttpDataOnly(success),
					  claimHttpDataOnly(error));
	}

	/**
	 * Выходи из системы.
	 */
	function logout(success, error) {

		$http({
				  method: 'POST',
				  url:    apiUrls.user.sign.out.root
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
				  url:    apiUrls.user.sign.up.email.root
			  }).then(claimHttpDataOnly(args.success),
					  claimHttpDataOnly(args.error));

	}

	function getUserProgress(success, error) {

		$http.get(apiUrls.user.statistics.progress.root).then(claimHttpDataOnly(success),
															  claimHttpDataOnly(error));

	}

	function updateUserProgress(score, callback) {

		$http({
				  url:    apiUrls.user.statistics.progress.root,
				  method: 'POST',
				  data:   {
					  score: score
				  }
			  }).then(callback);
	}

}
