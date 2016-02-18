/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.welcome');

app.controller('WelcomeController', ['$scope', '$storage', '$state', '$sce',
	function ($scope, $storage, $state, $sce)
	{
		var stat = $scope.stat = [
			JSON.parse($storage.local.getItem("statistic")),
			$storage.local.getItem('AllLessons') || 0
		];
		$scope.index = 0;

		$scope.labels = [];
		$scope.seriesC = ['Уничтоженные корабли'];
		$scope.seriesB = ['Собранные бонусы'];
		$scope.seriesT = ['Общее количество очков'];

		$scope.labelsL = ['Изученные уроки', 'Неизученные уроки'];
		$scope.dataL = [stat[1], 12 - stat[1]];
		// Формирует подписи оси ординат исходя из длины массива
		makeLabels();

		$scope.takeBonus = [[]];
		$scope.killSpaceCraft = [[]];
		$scope.totalScore = [[]];

		// Складывает в массивы информацию о пользователе
		makeStatistic();

		VK.Widgets.Group("vk_groups", {
			mode: 0,
			width: "auto",
			height: "345",
			color1: 'FFFFFF',
			color2: '25282C',
			color3: '152B39'
		}, 105816682);

		$scope.trustAsHtml = function (s)
		{
			return $sce.trustAsHtml(s);
		};

		$scope.goToTricks = function ()
		{
			$storage.local.removeItem('tipsAndTricks');
			$state.go("game");
		};

		function makeLabels()
		{
			if (stat[0])
			{
				for (var i = 1; i <= stat[0].length; i++)
				{
					$scope.labels.push(i);
				}
			}
			else
			{
				$scope.labels.push(0);
			}
		}

		function makeStatistic()
		{
			if (stat[0])
			{
				stat[0].forEach(function (s)
				{
					$scope.takeBonus[0].push(s.takenBonus);
					$scope.killSpaceCraft[0].push(s.killEnemy);
					$scope.totalScore[0].push(s.totalScore);
				})
			}
		}

		$scope.changeChart = function ()
		{
			if ($scope.stat[0])
			{
				$scope.index = ($scope.index + 1) % 2;
			}
		}
	}]);
