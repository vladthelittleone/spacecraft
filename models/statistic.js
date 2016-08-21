/**
 * Created by Ivan on 01.03.2016.
 */
const logger = require('utils/log')(module);
var mongoose = require('utils/mongoose');
var async = require('async');

var Schema = mongoose.Schema;

var schema = new Schema({
	idUser:  {
		type:     mongoose.Schema.Types.ObjectId,
		ref:      'User',
		unique:   true,
		required: true
	},
	lessons: {
		type: Array
	}
});

// заносим инфу о том сколько звездочек
// какому уроку было поставленно пользователем
schema.statics.updateLessonStarStatistics = updateLessonStarStatistics;

// возвращает статистуку пользователя
schema.statics.getUserStatistics = getUserStatistics;

// обновение инфы о прохождении пользователем уроков
schema.statics.updateLessonStatistics = updateLessonStatistics;

exports.Statistic = mongoose.model('Statistic', schema);

// возвращает статистуку пользователя
function getUserStatistics(id, callback) {

	var Statistic = this;

	async.waterfall([

		function (callback) {

			Statistic.findOne({idUser: id}, callback);

		}

	], callback);

}

// заносим инфу о том сколько звездочек
// какому уроку было поставленно пользователем
function updateLessonStarStatistics(req, callback) {

	var Statistic = this;

	async.waterfall([

		function (callback) {

			Statistic.findOne({idUser: req.session.user}, callback);

		},
		function (result, callback) {

			var lessons = result.lessons;
			var lesId = req.body.idLesson;

			// Проверка на изменение запроса.
			// Если по заданному lesId нет урока,
			// то выдаем ошибку.
			// IMPORTANT
			validateRequest(lessons[lesId], callback);

			lessons[lesId].stars = req.body.stars;

			Statistic.update({

				idUser: req.session.user

			}, {

				lessons: lessons

			}, {

				multi: true

			}, callback);

		}], callback);

}

// обновение инфы о прохождении пользователем уроков
function updateLessonStatistics(id, req, callback) {

	var Statistic = this;

	async.waterfall([

			function (callback) {

				// Ищем статистику юзера в базе
				Statistic.findOne({idUser: id}, callback);

			},
			function (result, callback) {

				var lessons = req.body;
				var lesId = req.body.lessonId;

				// Проверка на изменение запроса.
				// Если по заданному lesId нет урока,
				// то выдаем ошибку.
				// IMPORTANT
				validateRequest(lessons[lesId], callback);

				// Если в базе была стата об уроках
				if (result && result.lessons) {

					lessons = result.lessons;
					lessons[lesId] = req.body;
					lessons[lesId].completed = req.body.completed || lessons[lesId].completed;

				}

				// Апдейт записи о статистики. создание новой записи если ее нет
				Statistic.update({idUser: id}, {

					lessons: lessons

				}, {

					upsert: true,
					multi:  true

				}, callback);

			}], callback);

}

function validateRequest(expression, callback) {

	if (!expression) {

		callback(new Error('Can\'t get lessons by request'));

		logger.warn('Bad request. Possible fraudster!');

	}

}
