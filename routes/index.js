/**
 * Маршруты определения доступа ко всему, что может быть связано
 * с пользователем.
 *
 * @since 16.02.17
 * @author greezlock
 */

module.exports = function (app) {

	app.use('/user/sign', require('./user/sign'));

	app.use('/user/info', require('./user/info'));

	app.use('/user/statistics/lessons', require('./user/statistics/lessons'));

	app.use('/user/statistics/progress', require('./user/statistics/progress'));

	app.use('/statistics/lessons', require('./statistics/lessons'));

};
