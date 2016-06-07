/**
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.login');

app.controller('LoginController', ['$scope', '$state', 'authentication', function ($scope, $state, authentication)
{
	function toWelcome ()
	{
		$state.go('welcome');
	}

	function toLesson ()
	{
		login(function ()
		{
			$state.go('lesson', {id: 0})
		});
	}

	function error (res)
	{
		$scope.error = res.data;
	}

	function login(callback)
	{
		var email = $scope.email;
		var pswrd = $scope.password;

		authentication.login({
			email: email,
			password: pswrd,
			success: callback,
			error: error
		});
	}

	authentication.isLoggedIn(
	{
		success: toWelcome
	});

	$scope.loginByKey = function (code)
	{
		if (code === 13)
		{
			$scope.login();
		}
	};

	$scope.login = function ()
	{
		login(toWelcome);
	};

	$scope.register = function ()
	{
		var email = $scope.email;
		var pswrd = $scope.password;

		authentication.register({
			email: email,
			password: pswrd,
			success: toLesson,
			error: error
		});
	};
}]);
