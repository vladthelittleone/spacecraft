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
	$scope.loginByKey = loginByKey;
	$scope.register = register;
	$scope.login = login;

	// ==================================================

	function changeSubscribe() {

		$scope.isSubscribeOnEmail = !$scope.isSubscribeOnEmail;

	}

	function changeForm() {

		$scope.isEnterForm = !$scope.isEnterForm;

	}

	// Обработка нажатия клавиши 'Enter'
	function loginByKey(code) {

		if (code === ENTER) {

			$scope.login();

		}

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
	function register () {

		var email = $scope.email;

		var pass = $scope.password;

		var subscribe = $scope.isSubscribeOnEmail;

		authentication.register({
			email:    email,
			password: pass,
			isSubscribeOnEmail: subscribe,
			success:  toLesson,
			error:    error
		});

	}


	// Состояние ошибки
	function error(res) {

		$scope.error = res.data;

	}

	/**
	 * Вход в систему.
     */
	function login() {

		var email = $scope.email;

		var password = $scope.password;

		authentication.login({
			email:    email,
			password: password,
			success:  function(data) {

				// Оповещаем сервис аутентификации о усещной аутентификации.
				authService.loginConfirmed();

			},
			error:    error
		});

	}

}
