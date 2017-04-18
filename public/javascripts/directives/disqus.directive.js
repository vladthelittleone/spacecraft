'use strict';

module.exports = Disqus;

/**
 * Директива вывода комментариев, используя Disqus.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function Disqus() {

	var directive = {
		scope:       {
			lesson:      '=' // информация о уроке
		},
		templateUrl: 'views/directives/disqus.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {


	}

}
