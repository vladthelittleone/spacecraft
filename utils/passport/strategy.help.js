'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 02.10.16
 */

var Cohorts = require ('../../models/cohorts').Cohorts;
var Statistic = require ('models/statistic').Statistic;

var logger = require('../log')(module);

module.exports = StrategyHelp();

function StrategyHelp() {

	var that = {};

	that.updateCohort = updateCohort;
	that.updateTotalFinalScore = updateTotalFinalScore;

	return that;


	function updateCohort(user) {

		Cohorts.updateCohort (user._id, (data, cohortID) => {

			if(data) {

				data.cohorts[cohortID].visits++;

			}

		});

	}

	function updateTotalFinalScore(user) {

		let initTotalFinalScore = 0;
		let userId = user._doc._id;

		/**
		 * Регистрируем пользователя в статистике с начальной историей прохождения уроков.
		 */
		Statistic.updateTotalFinalScore (userId, initTotalFinalScore, (error) => {

			// Если произошла ошибка в процессе сохранения статистики, достаточно лишь
			// отписать об этом в лог.
			// На сам процесс регистрации это никак не повлияет, так что спокойно отвечаем
			// пользователю, даже при ошибке.
			if(error) {

				logger.info ('some problem with save of statistics for the new registered user: ',
					error);

			}
		});

	}

}
