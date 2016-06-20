'use strict';

ResultController.$inject = ['$scope', '$state', 'statistics', 'connection'];

module.exports = ResultController;

/**
 * Контроллер реузльтатов пользователя.
 *
 * Created by vladthelittleone on 08.12.15.
 */
function ResultController($scope, $state, statistics, connection) {

	// Получаем инфомрацию о статистики игрока.
	// Формируется в игровых компонентах.
	$scope.player = statistics.getPlayer();

	// Сохраняем на сервере
	connection.saveGameStatistics($scope.player);

	try
	{
		// Инициализация виджета ВК.
		VK.Widgets.Group("vk_groups", {
			mode:   0,
			width:  "auto",
			height: "100",
			color1: 'FFFFFF',
			color2: '25282C',
			color3: '152B39'
		}, 105816682);
	}
	catch (e)
	{
		//
	}

	$scope.reload = reload;

	// ==================================================

	function reload () {

		$state.go('game');

	}
}
