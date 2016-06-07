'use strict';

BotBoard.$inject = ['$sce'];

module.exports = BotBoard;

/**
 * Директива контроля доски BBot'а.
 *
 * @since 08.12.15
 * @author Skurishin Vladislav
 */
function BotBoard($sce) {

	var directive = {
		scope:       {
			quote:   '=', // Цитата
			lesson:  '=', // Текущий подурок
			textBot: '=', // Текст доски
			next:    '=', // callback следующего урока
			css:     '='  // css бота
		},
		templateUrl: 'views/directives/bbot-board.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link ($scope) {

		// Закрыть доску
		$scope.closeBBotList = function () {

			$scope.textBot = false;

		};

		// Вывод сохраненного текста
		$scope.getText = function () {

			if ($scope.textBot) {

				// Проверка html на мошенничество
				return $sce.trustAsHtml($scope.textBot);

			}

		};

	}

}
