'use strict';

LoginController.$inject = ['$scope', '$state', 'authentication', 'usSpinnerService'];

module.exports = LoginController;

/**
 * Контроллер авторизации пользователя.
 *
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function LoginController($scope, $state, authentication, usSpinnerService) {

	// Переменная отвечающая за отображение нужной формы
	$scope.isEnterForm = true;

	// По дефолту считаем, что человек согласен на рассылку
	$scope.flagOfSubscriptionToMailing = true;

	$scope.changeForm = changeForm;
	$scope.changeSubscribe = changeSubscribe;
	$scope.register = register;
	$scope.login = login;

	$scope.spinLoginSpinner = spinLoginSpinner;
	$scope.stopLoginSpinner = stopLoginSpinner;

	stopLoginSpinner();

	// ==================================================

	function changeSubscribe() {

		$scope.flagOfSubscriptionToMailing = !$scope.flagOfSubscriptionToMailing;

	}

	function changeForm() {

		$scope.isEnterForm = !$scope.isEnterForm;

	}

	function spinLoginSpinner() {

		usSpinnerService.spin('login-spinner');

	}

	function stopLoginSpinner() {

		usSpinnerService.stop('login-spinner');

	}

	/**
	 * Вызывается в случае успешной регистрации.
	 * Реализует логику вызова логирования и указания переходу к первому уроку.
	 */
	function prepareSuccessfulRegistration() {

		// Переопределяем success callback для метода логирования.
		login(function () {

			stopLoginSpinner();

			toTheFirstLesson();

		});

	}

	/**
	 * Вызывается по умолчанию, в случае успешного логирования.
	 */
	function defaultPreparationOfSuccessfulLogin() {

		stopLoginSpinner();

		toWelcome();

	}


	/**
	 * Регистрация в сервисе
	 */
	function register() {

		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {

			spinLoginSpinner();

			// В случае успешной регистрации делаем вызов метода логина (авторизуемся автоматически).
			authentication.register({
										email:                       $scope.email,
										password:                    $scope.password,
										flagOfSubscriptionToMailing: $scope.flagOfSubscriptionToMailing,
										success:                     prepareSuccessfulRegistration,
										error:                       error
									});

		}

	}

	/**
	 * Обработка ошибочной ситуации в контроллере.
	 * Метод принимает сообщение, которое необходимо отобразить клиенту.
	 * Если сообщение не задано (к примеру, данный коллбэк указывали в качестве обработчика
	 * ошибочной ситуации при авторизации и сервис не отвечает) -> указываем сообщение по умолчанию.
	 */
	function error(errorDescription) {

		stopLoginSpinner();

		$scope.errorMessage = errorDescription ? errorDescription :
							  "Что-то пошло не так, пожалуйста, попробуйте еще раз.";

	}

	/**
	 * Смена состояния на главную страницу.
	 */
	function toWelcome() {

		$state.go('welcome');

	}

	function toTheFirstLesson() {

		$state.go('lesson', {id: 0})
	}

	/**
	 * Вход в систему.
	 * Метод позволяет задать конкретное поведение в случае успешного логирования.
	 * По умолчанию, производится вызов метода prepareSuccessfulLogin.
	 */
	function login(successfulCallback) {

		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {

			spinLoginSpinner();

			authentication.login({
									 email:    $scope.email,
									 password: $scope.password,
									 success:  successfulCallback ? successfulCallback : defaultPreparationOfSuccessfulLogin,
									 error:    error
								 });

		}

	}

}
