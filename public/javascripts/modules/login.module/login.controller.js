'use strict';

var ENTER = 13;

LoginController.$inject = ['$scope', '$state', 'authentication'];

module.exports = LoginController;

/**
 * Контроллер авторизации пользователя.
 *
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function LoginController($scope, $state, authentication) {
	
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
	
	/**
	 * Регистрация в сервисе
	 */
	function register() {
		
		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {
			
			var email = $scope.loginForm.email.$modelValue;
			
			var password = $scope.loginForm.password.$modelValue;
			
			var subscribe = $scope.isSubscribeOnEmail;
			
			// В случае успешной регистрации делаем вызов метода логина (авторизуемся автоматически).
			authentication.register({
										email:              email,
										password:           password,
										isSubscribeOnEmail: subscribe,
										success:            login,
										error:              error
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
		
		$scope.errorMessage = errorDescription ? errorDescription :
							  "Что-то пошло не так, пожалуйста, попробуйте еще раз.";
		
	}
	
	/**
	 * Смена состояния на главную страницу.
	 */
	function toWelcome() {
		
		$state.go('welcome');
		
	}
	
	/**
	 * Вход в систему.
	 */
	function login() {
		
		// Если взаимодействовали с формой и форма заполнена корректно.
		if ($scope.loginForm.$dirty && $scope.loginForm.$valid) {
			
			var email = $scope.loginForm.email.$modelValue;
			
			var password = $scope.loginForm.password.$modelValue;
			
			authentication.login($scope.email,
								 $scope.password,
								 toWelcome,
								 error);
			
		}
		
	}
	
}
