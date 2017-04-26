'use strict';

module.exports = TableDirective;

/**
 * Директива таблицы для инфы в уроке
 *
 * Created by vaimer on 26.04.17.
 */
function TableDirective() {

	var directive = {
		scope:       {
			options:   '=', // Опции таблицы
			data:  '='  	// Данные таблицы
		},
		templateUrl: 'views/directives/table.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.options = {
			rowHeight: 50,
			headerHeight: 50,
			footerHeight: false,
			scrollbarV: false,
			selectable: false,
			columns: [{
				name: "Name",
				width: 300
			}, {
				name: "Gender"
			}, {
				name: "Company"
			}]
		};

		$scope.data = [
			{
				name:	"Ethel Price",
				gender:	"female",
				company:	"Enersol",
			},
			{
				name:	"Ethel Price",
				gender:	"female",
				company:	"Enersol",
			},
			{
				name:	"Ethel Price",
				gender:	"female",
				company:	"Enersol",
			}
		]
	}
}
