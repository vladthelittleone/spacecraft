'use strict';

WelcomeConfig.$inject = ['$stateProvider', 'ChartJsProvider'];

var resolve = require('./welcome.resolve').values;

module.exports = WelcomeConfig;

/**
 * Инициализация состояния главной страницы.
 */
function WelcomeConfig($stateProvider, ChartJsProvider) {

	// Настройка всех графиков
	ChartJsProvider.setOptions({
	   responsive: true
	});

	// Конфигурация графиков линейных
	ChartJsProvider.setOptions('line', {
		chartColors: ['#152B39', '#C5C8C6', '#152B37', '#C5C8C4'],
		datasetFill: false
	});

	$stateProvider.state('welcome', {
		url:         '/',
		templateUrl: 'views/main/welcome.html',
		controller:  'WelcomeController as ctrl',
		resolve:     resolve
	});

}

