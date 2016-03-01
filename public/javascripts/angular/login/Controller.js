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

	authentication.isLoggedIn(
	{
		success: toWelcome
	});

	$scope.login = function ()
	{
		var email = $scope.email;
		var pswrd = $scope.password;

		authentication.login({
			username: email,
			password: pswrd,
			success: toWelcome
		});
	}
}]);
