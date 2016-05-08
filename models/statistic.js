/**
 * Created by Ivan on 01.03.2016.
 */
var mongoose = require('utils/mongoose');
var async = require('async');
var config = require('config');

var Schema = mongoose.Schema;

var schema = new Schema({
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
		required: true
	},
	stat: {
		type: Array
	},
	maxScore: {
		type: Number
	},
	lessons: {
		type: Array
	},
	code: {
		type: String
	}
});

// выберамем пользователей, сортирую по количеству очков набраных в игре
schema.statics.getUserWithBestScore = function (callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function (callback)
		{
			// Join запрос, соедниям 2 таблицы статистику и юзеров
			// Берем не пустые поля макс очков и сортируем по убыванию
			Statistic.find(({ maxScore: { $ne: null } }))
				.populate('idUser')
				.sort('-maxScore')
				.exec(callback);
		}
	], callback);
};


// заносим инфу о том сколько звездочек
// какому уроку было поставленно пользователем
schema.statics.updateLessonStarStatistics = function (req, callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function(callback)
		{
			Statistic.findOne({idUser: req.session.user}, callback);
		},
		function(result, callback)
		{
			var lessons = result.lessons;
			var lesId = req.body.idLesson;

			lessons[lesId].stars = req.body.stars;

			Statistic.update(
			{
				idUser: req.session.user
			},
			{
				lessons: lessons
			},
			{
				multi: true
			}, callback);
		}],
		callback);
};

// возвращает статистуку пользователя
schema.statics.getUserStatistics = function (id, callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function (callback)
		{
			Statistic.findOne({idUser: id}, callback);
		}

	], callback);
};

// сохроняем код, который пользователь запускал в игре
schema.statics.updateUserCode = function(req, callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function(callback)
		{
			Statistic.update(
			{
				idUser: req.session.user
			},
			{
				code: req.body.code
			},
			{
				upsert: true,
				multi: true
			}, callback);
		}
	], callback);
};

// обновение инфы о прохождении пользователем уроков
schema.statics.updateLessonStatistics = function (id, req, callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function (callback)
		{
			// Ищем статистику юзера в базе
			Statistic.findOne({idUser: id}, callback);
		},
		function(result, callback)
		{
			var lessons = req.body;
			var lesId = req.body.lessonId;

			// Если в базе была стата об уроках
			if(result && result.lessons)
			{
				lessons = result.lessons;
				lessons[lesId] = req.body;
				lessons[lesId].completed = req.body.completed || lessons[lesId].completed;
			}

			// Апдейт записи о статистики. создание новой записи если ее нет
			Statistic.update({idUser: id},
			{
				lessons: lessons
			},
			{
				upsert: true,
				multi: true
			}, callback);
		}],
		callback);
};

// Обновление статистики по играм пользователей
schema.statics.updateGameStatistics = function (id, req, callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function (callback)
		{
			// Ищем статистику юзера в базе
			Statistic.findOne({idUser: id}, callback);
		},
		function (result, callback)
		{
			if (result)
			{
				var stat = result.stat;
				// Максимальное чилос очков за все игры пользователя
				var maxScore = req.body.totalScore;

				if (result.maxScore > maxScore)
				{
					maxScore = result.maxScore;
				}

				// Если нашли проверяем сколько игр он сыграл
				if (stat.length === config.get('maxStatisticsCount'))
				{
					stat.splice(0,1);
				}

				stat.push(req.body);
			}

			// Апдейт записи о статистики. создание новой записи если ее нет
			Statistic.update(
			{
				idUser: id
			},
			{
				stat: stat,
				maxScore: maxScore
			},
			{
				upsert: true,
				multi: true

			}, callback);
		}], callback);
};

exports.Statistic = mongoose.model('Statistic', schema);
