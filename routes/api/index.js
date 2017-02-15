/**
 * @since 15.02.2017
 * @author greezlock
 */

const login = require('./login');
const user = require('./user');
const main = require('./main');
const logout = require('./logout');
const reg = require('./registration');
const statistic = require('./statistic');
const metrics = require('./metrics');
const checkAuthentication = require('./../middlewares/check-authentication');

module.exports = function (app)
{
	// Мидлвер
	app.use('/login', login);
	app.use('/reg', reg);
	app.use('/logout', logout);

	// Проверка на аутентификацию, прежде чем допустить
	// к нижележащим маршрутам.
	app.use(checkAuthentication);

	app.use('/user', user);
	app.use('/statistic', statistic);
	app.use('/metrics', metrics)
};

