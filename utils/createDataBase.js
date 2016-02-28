var mongoose = require('utils/mongoose');
var async = require('async');

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers
], function (err)
{
	console.log(arguments);
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});

function open(callback)
{
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback)
{
	// Нативные вызовы монго.
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

/**
 * Отельная функция. Т.к. background:true.
 * И инициализация индексов выполняется в фоне.
 * Следовательно добавление пользователей может привести к повторам и
 * т.д. и т.п.
 *
 * @param callback
 */
function requireModels(callback)
{
	// Для сохранения индексом вызываем
	// в данной функции. Иначе при дропе удалим
	// все индексы.
	require('models/user');

	async.each(Object.keys(mongoose.models), function (modelName, callback)
	{
		// Проверка создания индекса.
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createUsers(callback)
{
	var users = [
		{username: 'Вася', password: 'supervasya'},
		{username: 'Петя', password: '123'},
		{username: 'admin', password: 'thetruehero'}
	];

	async.each(users, function (userData, callback)
	{
		var user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);
}
