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

	function error (res)
	{
		$scope.error = res.data;
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
		var email = $scope.email;
		var pswrd = $scope.password;

		authentication.login({
			email: email,
			password: pswrd,
			success: toWelcome,
			error: error
		});
	};

	$scope.register = function ()
	{
		var email = $scope.email;
		var pswrd = $scope.password;

		authentication.register({
			email: email,
			password: pswrd,
			success: $scope.login,
			error: error
		});
	};
}]);
