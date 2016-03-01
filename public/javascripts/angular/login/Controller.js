/**
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.login');

app.controller('LoginController', ['$scope', '$http', function ($scope, $http)
{
	$scope.login = function ()
	{
		var email = $scope.email;
		var pswrd = $scope.password;

		$http({
			method: 'POST',
			data: {
				username: email,
				password: pswrd
			},
			url: '/login'
		})
		.then(function success (response)
		{
			console.log(response);
		},
		function error (response)
		{
			console.log(response);
		});
	}
}]);
