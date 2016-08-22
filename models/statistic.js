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

// возвращает статистику пользователя
schema.statics.getUserStatistics = getUserStatistics;

// обновение инфы о прохождении пользователем уроков
schema.statics.updateLessonStatistics = updateLessonStatistics;

exports.Statistic = mongoose.model('Statistic', schema);

/**
 * возвращает статистику пользователя
 */
function getUserStatistics(id, callback) {

	var Statistic = this;

	async.waterfall([

		function (callback) {

			Statistic.findOne({idUser: id}, callback);

		}

	], callback);

}

/**
 * Заносим инфу о том сколько звездочек
 * какому уроку было поставленно пользователем.
 */
function updateLessonStarStatistics(req, callback) {

	var Statistic = this;
	var id = req.session.user;

	// Проверка коректности Id.
	if (validateParam(id, callback)) {

		async.waterfall([

			function (callback) {

				Statistic.findOne({idUser: id}, callback);

			},

			function (statistics, callback) {

				var lessons = statistics && statistics.lessons;
				var lesId = req.body.idLesson;

				// Если запрос корректен, выполняем обновление
				// Иначе выкидывается ошибка в async
				if (validateParam(lessons && lessons[lesId], callback)) {

					updateStarStatisticsByLessonId({
						req:      req,
						lessons:  lessons,
						update:   Statistic.update,
						callback: callback
					});

				}

			}], callback);
	}

}

/**
 * Обновение инфы о прохождении пользователем уроков.
 */
function updateLessonStatistics(req, callback) {

	var Statistic = this;
	var id = req.session.user;

	// Проверка коректности Id.
	if (validateParam(id, callback)) {

		async.waterfall([

			function (callback) {

				// Ищем статистику юзера в базе
				Statistic.findOne({idUser: id}, callback);

			},
			function (statistics, callback) {

				var lessons = req.body;
				var lesId = req.body.lessonId;

				// Если запрос корректен, выполняем обновление
				// Иначе выкидывается ошибка в async
				if (validateParam(lessons && lessons[lesId], callback)) {

					updateLessonStatisticsByLessonId({
						req: req,
						statistics: statistics,
						update: Statistic.update,
						callback: callback
					});

				}

			}], callback);

	}

}

/**
 * Обвноляем инфомрацию о рейтинге в базе данных.
 *
 * @param args.lessons информация о уроке
 * @param args.req параметр запроса
 * @param args.callback коллбек async
 * @param args.update функция обновления статистики
 */
function updateStarStatisticsByLessonId(args) {

	var lessonId = args.req.body.idLesson;

	args.lessons[lessonId].stars = args.req.body.stars;

	args.update({

		idUser: args.req.session.user

	}, {

		lessons: args.lessons

	}, {

		multi: true

	}, args.callback);

}

/**
 * Обвноляем инфомрацию о статитстике в базе данных.
 *
 * @param args.req параметр запроса
 * @param args.statistics найденная статистика в базе
 * @param args.callback коллбек async
 * @param args.update функция обновления статистики
 */
function updateLessonStatisticsByLessonId(args) {

	//var req = args.req, statistics, update, callback
	var lessons = args.req.body;
	var lessonId = args.req.body.lessonId;
	var id = args.req.session.user;

	// Если в базе была статистика об уроках
	if (args.statistics && args.statistics.lessons) {

		lessons = args.statistics.lessons;
		lessons[lessonId] = args.req.body;
		lessons[lessonId].completed = args.req.body.completed || lessons[lessonId].completed;

	}

	// Апдейт записи о статистики.
	// Создание новой записи если ее нет.
	args.update({idUser: id}, {

		lessons: lessons

	}, {

		upsert: true,
		multi:  true

	}, args.callback);

}

/**
 * Проверка выражения. В случае отрицательного результата пробрасываем ошибку.
 *
 * @param expression выражение
 * @param callback обработки ошибки
 * @return boolean результат проверки
 */
function validateParam(expression, callback) {

	var result = true;

	if (!expression) {

		logger.warn('Bad request. Possible fraudster!');

		callback(new Error('Can\'t get lessons by request'));

		result = false;

	}

	return result;

}
