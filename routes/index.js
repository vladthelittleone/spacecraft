/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */
const users = require('./users');
const login = require('./login');
const user = require('./user');
const main = require('./main');
const logout = require('./logout');
const reg = require('./registration');
const statistic = require('./statistic');
const metrics = require('./metrics');

module.exports = function (app)
{
	// Мидлвер
	app.use('/', main);
	app.use('/users', users);
	app.use('/login', login);
	app.use('/user', user);
	app.use('/reg', reg);
	app.use('/logout', logout);
	app.use('/statistic', statistic);
	app.use('/metrics', metrics)
};

