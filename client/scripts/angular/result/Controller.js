/**
 * Created by vladthelittleone on 08.12.15.
 */
var app = angular.module('spacecraft.result');

app.controller('ResultController', ['$scope', '$state', 'statistics', '$storage',
	function ($scope, $state, statistics, $storage)
	{
		$scope.player = statistics.getPlayer();

		var stat = $storage.local.getItem("statistic") || [];
		stat.push($scope.player);
		$storage.local.setItem("statistic",stat);

		console.log($storage.local.getItem("statistic"));
		VK.Widgets.Group("vk_groups", {
			mode: 0,
			width: "auto",
			height: "100",
			color1: 'FFFFFF',
			color2: '25282C',
			color3: '152B39'
		}, 105816682);

		$scope.reload = function ()
		{
			$state.go('game');
		};
	}]);
