/**
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.welcome');

app.controller('WelcomeController', ['$scope', '$storage', '$state', '$sce', 'authentication',
	function ($scope, $storage, $state, $sce, authentication)
	{
		authentication.currentUser(function (user)
		{
			$scope.mail = user && user.email;
		});

		var empty = [
			{
				killEnemy: 0,
				takenBonus: 0,
				totalScore: 0,
				acceptDamage: 0,
				takenDamage: 0
			}
		];

		function sum(a, param1, param2, predicate)
		{
			var c = 0;

			a.forEach(function (v)
			{
				if (!v)
				{
					return;
				}

				if (v[predicate])
				{
					c += v[param1];
				}
				else
				{
					c += v[param2];
				}
			});

			return c;
		}

		var stat = $scope.stat = JSON.parse($storage.local.getItem("statistic")) || empty;
		var lessons = JSON.parse($storage.local.getItem("lessons")) || [];

		// Кол-во подуроков
		var size = sum(lessons, null, 'size') || 100;

		// Добавляем полное кол-во уроков, если он уже был пройден,
		// иначе номер текущего урока.
		var end = sum(lessons, 'size', 'current', 'completed');

		// Вычитаем из общего размера.
		var notEnd = size - end;

		$scope.index = 0;

		$scope.labels = [];
		$scope.seriesT = ['Общее количество очков'];

		$scope.labelsL = ['Изученные уроки', 'Неизученные уроки'];
		$scope.dataL = [end, notEnd];

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
			if (stat)
			{
				for (var i = 1; i <= stat.length; i++)
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
			if (stat)
			{
				stat.forEach(function (s)
				{
					$scope.takeBonus[0].push(s.takenBonus);
					$scope.killSpaceCraft[0].push(s.killEnemy);
					$scope.totalScore[0].push(s.totalScore);
				})
			}
		}

		$scope.changeChart = function ()
		{
			$scope.index = ($scope.index + 1) % 2;
		};

		$scope.logout = function ()
		{
			function toLogin ()
			{
				$state.go('login');
			}
			authentication.logout(
			{
				success: toLogin
			});
		};
	}]);
