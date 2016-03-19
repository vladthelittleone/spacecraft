/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.welcome');

app.controller('WelcomeController', ['$scope', '$storage', '$state', '$sce', 'authentication', '$http',
	function ($scope, $storage, $state, $sce, authentication, $http)
	{
		$http.get('/statistic').success(function (data)
		{
			makeStatistic(data);
			makeLabels(data)
		});

		$scope.usersLead = [];
		$scope.hideLead = true;

		$http.get('/statistic/score').success(function (data)
		{
			$scope.usersLead = data;

			if(data.length)
			{
				$scope.hideLead = false;
			}
		});

		$scope.labelsL = ['Изученные уроки', 'Неизученные уроки'];

		$http.get('/statistic/lessons').success(function(data)
		{
			// Кол-во подуроков
			var size = sum(data, null, 'size') || 100;

			// Добавляем полное кол-во уроков, если он уже был пройден,
			// иначе номер текущего урока.
			var end = sum(data, 'size', 'current', 'completed');

			// Вычитаем из общего размера.
			var notEnd = size - end;
			$scope.dataL = [end, notEnd];
		});

		authentication.currentUser(function (user)
		{
			$scope.mail = user && user.email;
		});

		function sum(a, param1, param2, predicate)
		{
			var c = 0;

			a.forEach(function (v)
			{
				if (v[predicate])
				{
					c =+ v[param1];
				}
				else
				{
					c =+ v[param2];
				}
			});

			return c;
		}

		$scope.index = 0;

		$scope.labels = [];
		$scope.seriesT = ['Общее количество очков'];

		$scope.takeBonus = [[]];
		$scope.killSpaceCraft = [[]];
		$scope.totalScore = [[]];

		$scope.vkShow = true;

		try
		{
			VK.Widgets.Group("vk_groups", {
				mode: 0,
				width: "auto",
				height: "345",
				color1: 'FFFFFF',
				color2: '25282C',
				color3: '152B39'
			}, 105816682)
		}
		catch (e)
		{
			$scope.vkShow = false;
		}

		$scope.trustAsHtml = function (s)
		{
			return $sce.trustAsHtml(s);
		};

		$scope.goToTricks = function ()
		{
			$storage.local.removeItem('tipsAndTricks');
			$state.go("game");
		};

		function makeLabels(stat)
		{
			$scope.labels = [];

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

		function makeStatistic(stat)
		{
			$scope.takeBonus[0] = [];
			$scope.killSpaceCraft[0] = [];
			$scope.totalScore[0] = [];

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
