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

const HttpError = require('error').HttpError;


module.exports = function (app)
{
	// Мидлвер
	app.use('/login', login);
	app.use('/reg', reg);
	app.use('/logout', logout);
	// Данный мидлвар осуществляет проверку аутентификации пользователя,
	// чтобы допустить его к нижележащим маршрутам.
	app.use(function(req, res, next) {

		if (!req.isAuthenticated()) {

			return next(new HttpError(401, "Вы не авторизованы"));

		}

		next();

	});
	app.use('/', main);
	app.use('/user', user);
	app.use('/statistic', statistic);
	app.use('/metrics', metrics)
};

