'use strict';

var ENTER = 13;

LoginController.$inject = ['$scope', '$state', 'authentication', 'authService'];

module.exports = LoginController;

/**
 * Контроллер авторизации пользователя.
 *
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function LoginController($scope, $state, authentication, authService) {

	// Переменная отвечающая за отображение нужной формы
	$scope.isEnterForm = true;

	// По дефолту считаем, что человек согласен на рассылку
	$scope.isSubscribeOnEmail = true;

	$scope.changeForm = changeForm;
	$scope.changeSubscribe = changeSubscribe;
	$scope.register = register;
	$scope.login = login;

	// ==================================================

	function changeSubscribe() {

		$scope.isSubscribeOnEmail = !$scope.isSubscribeOnEmail;

	}

	function changeForm() {

		$scope.isEnterForm = !$scope.isEnterForm;

	}

	// Переход на состояние первого урока
	function toLesson() {

		login(function () {

			$state.go('lesson', {id: 0})

		});

	}

	/**
	 * Регистрация в сервисе
	 */
	function register() {

		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {

			var email = $scope.loginForm.email.$modelValue;

			var pass = $scope.loginForm.password.$modelValue;

			var subscribe = $scope.isSubscribeOnEmail;

			authentication.register({
										email:              email,
										password:           pass,
										isSubscribeOnEmail: subscribe,
										success:            toLesson,
										error:              error
									});

		}

	}


	// Состояние ошибки
	function error(res) {

		$scope.error = res.data;

	}

	/**
	 * Вход в систему.
	 */
	function login() {

		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {

			var email = $scope.loginForm.email.$modelValue;

			var password = $scope.loginForm.password.$modelValue;

			authentication.login({
									 email:    email,
									 password: password,
									 success:  authService.loginConfirmed,
									 error:    error
								 });

		}

	}

}
