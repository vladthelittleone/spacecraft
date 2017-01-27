/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */
const login = require('./login');
const user = require('./user');
const main = require('./main');
const logout = require('./logout');
const reg = require('./registration');
const statistic = require('./statistic');
const metrics = require('./metrics');
const checkAuthentication = require('./../middlewares/check-authentication');

const HttpError = require('error').HttpError;

module.exports = function (app)
{
	// Мидлвер
	app.use('/login', login);
	app.use('/reg', reg);
	app.use('/logout', logout);
	app.use('/checkSession', checkAuthentication);

	// Проверка на аутентификацию, прежде чем допустить
	// к нижележащим маршрутам.
	app.use(checkAuthentication);

	app.use('/', main);
	app.use('/user', user);
	app.use('/statistic', statistic);
	app.use('/metrics', metrics)
};

