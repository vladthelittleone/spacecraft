'use strict';

module.exports = Statistics;

/**
 * Сервис хранения статистики пользователя по игре.
 *
 * Created by Ivan on 10.11.2015.
 */
function Statistics ()
{
	var that = {};
	var statistic = [];
	var player = null;

	that.setPlayer = setPlayer;
	that.getPlayer = getPlayer;
	that.addInformation = addInformation;
	that.getInformation = getInformation;

	return that;

	function setPlayer (p)
	{
		player = p;
	}

	function getPlayer ()
	{
		return player;
	}

	function addInformation (s)
	{
		statistic.push(s);
	}

	function getInformation ()
	{
		return statistic;
	}

}
