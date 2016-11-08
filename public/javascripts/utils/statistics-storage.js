'use strict';

/**
 * Created by vaimer on 06.10.16.
 */

module.exports = StatisticsStorage();

function StatisticsStorage(){

	var that = {};

	var userProgress;

	that.initialize = initialize;
	that.getUserProgress = getUserProgress;

	initialize();

	return that;

	function initialize() {



	}

	function getUserProgress() {

		return userProgress;
	}
}
