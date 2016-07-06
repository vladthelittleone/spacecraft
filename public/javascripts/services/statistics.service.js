'use strict';

module.exports = Statistics();

/**
 * Сервис хранения статистики пользователя по игре.
 *
 * Created by Ivan on 10.11.2015.
 */
function Statistics ()  {

	var that = {};
	var statistic = [];
	var player = null;
	var runCount = [];

	that.setPlayer = setPlayer;
	that.getPlayer = getPlayer;
	that.addInformation = addInformation;
	that.getInformation = getInformation;
	that.incRunCount = incRunCount;

	return that;

	function setPlayer (p)  {

		player = p;

	}

	function getPlayer ()  {

		return player;

	}

	function addInformation (s)  {

		statistic.push(s);

	}

	function getInformation ()  {

		return statistic;

	}

	function incRunCount(subIndex)  {

		if (runCount[subIndex] === undefined)  {

			runCount[subIndex] = 1;

		}
		else  {

			runCount[subIndex]++;

		}

	}

}
