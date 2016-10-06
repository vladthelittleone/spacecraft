'use strict';

WelcomeController.$inject = ['$scope', '$state', '$sce', 'authentication', 'connection', 'statisticsStorage'];

module.exports = WelcomeController;

/**
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function WelcomeController($scope, $state, $sce, authentication, connection, statisticsStorage) {

	$scope.leadersList = [];	// Лидеры игры
	$scope.showLeaderboard = false;	// Переключатель таблицы лидеров
	$scope.vkShow = true; 	// Переключатель виджета ВК

	$scope.chartIndex = 0;	// Номер текущего графика
	$scope.labels = [];		// Лейблы графика


	$scope.seriesT = ['Общее количество очков'];
	$scope.labelsL = ['Изученные уроки', 'Неизученные уроки'];

	$scope.changeChart = changeChart;
	$scope.logout = logout;
	$scope.trustAsHtml = trustAsHtml;
	$scope.showLineGraphic = false;

	$scope.openLessons = connection.metrics.hitOpenLesson();

	/**
	 * Формирование статистики по всем параметрам.
	 */
	connection.getLessonsStatistics(formDataForChart);

	connection.getLeaderboard(formLeaderboard);

	prepareDataLineGraphic();

	// Инифиализация ВК
	initVK();

	authentication.currentUser(initUser);


	// ==================================================

	function prepareDataLineGraphic() {

		var data = statisticsStorage.getUserProgress();

		if (data) {

			fromDataForLineChart(data);

		}
	}

	/**
	 * Инициализация виджета ВК.
	 */
	function initVK() {

		try {

			VK.Widgets.Group("vk_groups", {
				mode:   0,
				width:  "auto",
				height: "345",
				color1: 'FFFFFF',
				color2: '25282C',
				color3: '152B39'
			}, 105816682);

		}
		catch (e) {

			// При ошибке не показываем виджет
			$scope.vkShow = false;

		}

	}

	function formLeaderboard(res) {

		$scope.leadersList = res.data;

		// Открываем таблицу лидеров, так как все
		// данные загрузились
		$scope.showLeaderboard = true;

	}

	/**
	 * Формирование данных для графика.
	 *
	 * lessons это массив элементов, каждый из которых,
	 * по крайней мере, имеет следующие поля:
	 * subLessonCount, currentSubLesson, completed.
	 *
	 * subLessonCount - кодичество подуроков.
	 * currentSubLesson - текущий подурок.
	 * completed - был ли уже пройден урок.
	 */
	function formDataForChart(res) {

		// Забираем уроки из ответа.
		// Ответ может быть и пустым.
		var lessons = res.data.lessons || [];

		// Кол-во подуроков
		var subLessonCount = sum(lessons, 'subLessonCount') || 100;

		// Добавляем полное кол-во уроков, если он уже был пройден,
		// иначе номер текущего урока.
		var end = sum(lessons, 'currentSubLesson', 'subLessonCount', 'completed');

		// Вычитаем из общего размера.
		var notEnd = subLessonCount - end;

		$scope.dataL = [end, notEnd];

	}

	/**
	 * Функция формирует данные для графика
	 * Данные -  приходит  массив
	 * и сами данные для графика должны находится в массиве
	 */
	function fromDataForLineChart(result) {
		// Если result еопределен, график непостроется и
		// Пользователю вывадится не будет
		if (result && !$scope.showLineGraphic) {

			// Подготовка данных для вывода графика,
			// представление данных [[1,2,3],[3,4,5]] - 2 графика
			$scope.totalScore = [];

			$scope.totalScore.push(result);

			// Задаем подписи оси оХ
			// (соответсвие индексов данного массива к массиву результатов )
			$scope.labels = [];

			for (var i = 1; i <= $scope.totalScore[0].length; i++) {

				$scope.labels.push(i);

			}

			// Конец подготовки данных, и гоорим что готово!
			$scope.showLineGraphic = !$scope.showLineGraphic;
			$scope.seriesT = ['Последние полученные очки'];
		}
	}

	/**
	 * Суммирование по параметру элементов массива массива.
	 *
	 * @param a массив, параметры елементов которого суммируются.
	 * @param param1 параметр элемента, который суммируется, если predicate элемента равен false.
	 * @param param2 параметр элемента, который суммируется, если predicate элемента равен true.
	 * @param predicate условие при котором param1, param2 элементов складываются
	 * @returns {number} сумма
	 */
	function sum(a, param1, param2, predicate) {

		var c = 0;

		a.forEach(function (v) {

			if (v[predicate]) {

				c += v[param2];

			}
			else {

				c += v[param1];

			}

		});

		return c;

	}

	// Проверка мошеничества
	function trustAsHtml(s) {

		return $sce.trustAsHtml(s);

	}

	// Изменить текущий график на следующий
	function changeChart() {

		if ($scope.showLineGraphic) {

			// Реализовать переключение графиков
			$scope.chartIndex = ($scope.chartIndex + 1) % 2;

		}
	}

	// Инициализация пользователя
	function initUser(user) {

		$scope.mail = user && user.email;

	}

	/**
	 * Выход из системы.
	 */
	function logout() {

		authentication.logout({

			success: function () {

				// Переход на страницу авторизации
				$state.go('login');

			}

		});
	}
}
