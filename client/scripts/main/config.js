/**
 * Created by vladthelittleone on 30.11.15.
 */
module.exports = function ($stateProvider)
{
	// Our first state called `menu`
	$stateProvider
		.state('game', {
			url: '',
			templateUrl: 'views/main.html',
			controller: 'MainController as ctrl'
		});
};
