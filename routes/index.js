/**
 * @since 16.02.17
 * @author greezlock
 */

module.exports = function (app) {

	app.use('/', require('./authentication'));

	app.use('/', require('./user/info'));

	app.use('/', require('./user/statistics/lessons'));

	app.use('/', require('./user/statistics/progress'));

	app.use('/', require('./statistics/lessons'));

};
