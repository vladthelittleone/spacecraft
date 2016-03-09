'use strict';

/**
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.authentication', []);

app.factory('authentication', ['$http', '$state', function ($http, $state)
{
	var login = function (args)
	{
		var success = args.success;
		var error = args.error;

		$http({
			method: 'POST',
			data: {
				email: args.email,
				password: args.password
			},
			url: '/login'
		})
		.then(success, error);
	};

	var logout = function (args)
	{
		var success = args.success;
		var error = args.error;

		$http({
			method: 'POST',
			url: '/logout'
		})
		.then(success, error);
	};

	var register = function (args)
	{
		var success = args.success;
		var error = args.error;

		$http({
			method: 'POST',
			data: {
				email: args.email,
				password: args.password
			},
			url: '/reg'
		})
		.then(success, error);
	};

	var isLoggedIn = function (args)
	{
		var success = args.success;
		var error = args.error;

		$http({
			method: 'GET',
			url: 'login/check'
		})
		.then(success, error);
	};

	var currentUser = function (callback)
	{
		isLoggedIn(
		{
			success: function (res)
			{
				callback(res.data);
			}
		})
	};

	return {
		login: login,
		logout: logout,
		isLoggedIn: isLoggedIn,
		currentUser: currentUser,
		register: register
	};
}]);
