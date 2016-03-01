'use strict';

/**
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
var app = angular.module('spacecraft.authentication', []);

app.factory('authentication', ['$http', '$state', function ($http, $state)
{
	var user;

	var login = function (args)
	{
		var success = args.success;
		var error = args.error;

		$http({
			method: 'POST',
			data: {
				username: args.username,
				password: args.password
			},
			url: '/login'
		})
		.then(function (res)
		{
			user = res.user;
			success && success();
		},
		function (res)
		{
			user = null;
			error && error();
		});
	};

	var logout = function (args)
	{
		var success = args.success;
		var error = args.error;

		$http({
			method: 'POST',
			url: '/logout'
		})
		.then(function (res)
		{
			user = null;
			success && success();
		},
		function ()
		{
			error && error();
		});
	};

	var isLoggedIn = function (args)
	{
		var success = args.success;
		var error = args.error;

		$http({
			method: 'GET',
			url: 'login/check'
		})
		.then(function (res)
		{
			user = res.user;
			success && success();
		},
		function (res)
		{
			user = null;
			error && error();
		});
	};

	var currentUser = function ()
	{
		return user;
	};

	return {
		login: login,
		logout: logout,
		isLoggedIn: isLoggedIn,
		currentUser: currentUser
	};
}]);
