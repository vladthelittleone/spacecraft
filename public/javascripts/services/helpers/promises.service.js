'use strict';

Promises.$inject = ['$q', 'authentication', 'connection', 'statisticsStorage'];

module.exports = Promises;

/**
 * Модуль введен с целью укомплектования в себя набор многократно используемых
 * promise'ов в коде.
 * Намного удобней и компактней смотрится обращение к методу из этого набора напрямую,
 * нежели явное определение анонимной функции.
 * Преимущественно используется в resolve'ах состояний.
 * Но модуль своим именем не запрещает применять и в иных местах :)
 *
 * @since 11.02.17
 * @author greezlock
 */

function Promises($q, authentication, connection, statisticsStorage) {

	var t = {};

	t.getAuthenticationStatus = getAuthenticationStatus;
	t.getLessonStatisticsData = getLessonStatisticsData;
	t.getLeaderBoardData = getLeaderBoardData;
	t.getUserProgressData = getUserProgressData;
	t.getUserInfoData = getUserInfoData;

	return t;

	function getAuthenticationStatus() {

		return authentication.getPromiseOfAuthenticationStatus();

	}

	function getLessonStatisticsData() {

		return $q(connection.getLessonsStatistics);

	}

	function getLeaderBoardData() {

		return $q(connection.getLeaderboard);

	}

	function getUserProgressData() {

		return $q(statisticsStorage.getUserProgress);

	}

	function getUserInfoData() {

		return $q(connection.getUserInfo);

	}

}
