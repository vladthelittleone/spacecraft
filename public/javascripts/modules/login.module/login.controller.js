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
	$scope.subscriptionToMailingFlag = true;

	$scope.changeForm = changeForm;
	$scope.changeSubscriptionToMailingFlag = changeSubscriptionToMailingFlag;
	$scope.register = register;
	$scope.login = login;

	$scope.startLoginSpinner = startLoginSpinner;
	$scope.stopLoginSpinner = stopLoginSpinner;

	stopLoginSpinner();

	// ==================================================

	function changeSubscriptionToMailingFlag() {

		$scope.subscriptionToMailingFlag = !$scope.subscriptionToMailingFlag;

	}

	function changeForm() {

		$scope.isEnterForm = !$scope.isEnterForm;

	}

	function startLoginSpinner() {

		usSpinnerService.spin('login-spinner');

	}

	function stopLoginSpinner() {

		usSpinnerService.stop('login-spinner');

	}

	/**
	 * Вызывается в случае успешной регистрации.
	 * Реализует логику вызова логирования и указания переходу к первому уроку.
	 */
	function onSuccessfulRegistration() {

		// Переопределяем success callback для метода логирования.
		login(function () {

			$state.go('lesson', {id: 0});

		});

	}

	/**
	 * Регистрация в сервисе
	 */
	function register() {

		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {

			startLoginSpinner();

			// В случае успешной регистрации делаем вызов метода логина (авторизуемся автоматически).
			authentication.register({
										email:                     $scope.email,
										password:                  $scope.password,
										subscriptionToMailingFlag: $scope.subscriptionToMailingFlag,
										success:                   onSuccessfulRegistration,
										error:                     controllerErrorHandler
									});

		}

	}

	/**
	 * Обработка ошибочной ситуации в контроллере.
	 * Метод принимает сообщение, которое необходимо отобразить клиенту.
	 * Если сообщение не задано (к примеру, данный коллбэк указывали в качестве обработчика
	 * ошибочной ситуации при авторизации и сервис не отвечает) -> указываем сообщение по умолчанию.
	 */
	function controllerErrorHandler(errorDescription) {

		stopLoginSpinner();

		$scope.errorMessage = errorDescription ? errorDescription :
							  "Что-то пошло не так, пожалуйста, попробуйте еще раз.";

	}

	/**
	 * Вход в систему.
	 * Метод позволяет задать конкретное поведение в случае успешного логирования.
	 * По умолчанию, производится вызов метода prepareSuccessfulLogin.
	 */
	function login(onSuccess) {

		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {

			startLoginSpinner();

			authentication.login({
									 email:    $scope.email,
									 password: $scope.password,
									 success:  function () {

										 stopLoginSpinner();

										 onSuccess ? onSuccess() : $state.go('welcome');

									 },
									 error:    controllerErrorHandler
								 });

		}

	}

}
