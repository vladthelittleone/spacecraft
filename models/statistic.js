/**
 * Created by Ivan on 01.03.2016.
 */
var mongoose = require('utils/mongoose');
var async = require('async');

var Schema = mongoose.Schema;

var schema = new Schema({
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
		required: true
	},
	lessons: {
		type: Array
	}
});

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

exports.Statistic = mongoose.model('Statistic', schema);
