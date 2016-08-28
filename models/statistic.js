/**
 * Created by Ivan on 01.03.2016.
 */
const logger = require('utils/log')(module);
var mongoose = require('utils/mongoose');
var async = require('async');
var lodash = require('lodash');

var Schema = mongoose.Schema;

var schema = new Schema({
	idUser:          {
		type:     mongoose.Schema.Types.ObjectId,
		ref:      'User',
		unique:   true,
		required: true
	},
	totalFinalScore: {
		type: Number
	},
	lessons:         {
		type: Array
	}
});

// заносим инфу о том сколько звездочек
// какому уроку было поставленно пользователем
schema.statics.updateLessonStarStatistics = updateLessonStarStatistics;

// возвращает статистику пользователя
schema.statics.getUserStatistics = getUserStatistics;

schema.statics.updateTotalFinalScore = updateTotalFinalScore;

// обновение инфы о прохождении пользователем уроков
schema.statics.updateLessonStatistics = updateLessonStatistics;

exports.Statistic = mongoose.model('Statistic', schema);

/**
 * возвращает статистику пользователя
 */
function getUserStatistics(idUser, callback) {


	var modelStatistics = this;

	prepareCurrentUserStatistics(modelStatistics, idUser, callback);

}

/**
 * Данный метод обращается к БД за имеющейся статистикой, а после
 * осущ. вызов метода callback, который должен обработать ее по своему усмотрению.
 *
 * Ожидается, что все параметры на входе функции корректны
 * (по крайней мере не null и не undefined).
 *
 * @param modelStatistics модель коллекции статистики, по отношению к которой
 *                          и будет производиться выборка.
 * @param idUser идентификатор пользователя, по которому будет осуществляться выборка
 *                 статистики из БД.
 * @param callback Ожидаемая сигнатура метода callback:
 *                      - error если прозошла какая либо ошибка;
 *                      - statistics статистика, выбранная из БД по указанному пользователю.
 */
function prepareCurrentUserStatistics(modelStatistics, idUser, callback) {

	if (validateParam(idUser, callback)) {

		async.waterfall([

			function (callback) {

				modelStatistics.findOne({idUser: idUser}, callback);

			},
			function (statistics) {

				// worker сам знает как ему продолжить цепочку вызовов,
				// поэтому коллбэк от async ему не нужен.
				callback(null, statistics);

			}

		], callback);

	}

}


/**
 * Заносим инфу о том сколько звездочек
 * какому уроку было поставленно пользователем.
 */
function updateLessonStarStatistics(idUser, dataForUpdate, callback) {

	var modelStatistics = this;

	// Проверка коректности пришедших данных для обновления.
	// Проверять поля: idUser, dataForUpdate.lessonId и
	// dataForUpdate.stars на undefined или null нет необходимости.
	// Метод update в mongoose сам проверяет параметры на корректность.
	if (validateParam(dataForUpdate, callback)) {

		modelStatistics.update({

			idUser: idUser

		}, {

			$set: {['lessons.' + dataForUpdate.lessonId + '.stars']: dataForUpdate.stars}

		},callback);

	}

}

function updateTotalFinalScore(idUser, additionalTotalFinalScoreValue, callback) {

	var modelStatistics = this;

	prepareCurrentUserStatistics(modelStatistics, idUser, function (error, userStatistics) {

		if (error) {

			callback(error);

		}

		// additionalTotalFinalScoreValue может быть недействительным,
		// к примеру, если в данный метод напрямую передавать значение,
		// которое ожидается от пользователя.
		var totalFinalScore = additionalTotalFinalScoreValue || 0;

		if (userStatistics && userStatistics.totalFinalScore) {

			totalFinalScore = totalFinalScore + userStatistics.totalFinalScore;

		}

		modelStatistics.update({

			idUser: idUser

		}, {

			$setOnInsert: { lessons: [] },
			$set: { totalFinalScore: totalFinalScore }

		}, {

			upsert: true

		}, callback)

	});

}

/**
 * Обновение инфы о прохождении пользователем уроков.
 */
function updateLessonStatistics(idUser, dataForUpdate, callback) {

	if (validateParam(dataForUpdate, callback) && validateParam(dataForUpdate.lesson, callback)) {

		var lesson = dataForUpdate.lesson;
		var lessonId = dataForUpdate.lesson.lessonId;

		// Обновляем  общее число очков пользователя.
		this.updateTotalFinalScore(idUser, dataForUpdate.finalScoreForLesson, callback);

		this.update({

			idUser: idUser

		}, {

			$setOnInsert: { lessons: [] },
			$set: {['lessons.' + lessonId]: lesson}

		},
		{

			upsert: true

		}, callback);

	}

}

/**
 * Проверка выражения на null или undefined.
 * В случае равенства, пробрасываем ошибку.
 *
 * @param expression выражение
 * @param callback обработки ошибки
 * @return boolean результат проверки
 */
function validateParam(expression, callback) {

	var result = true;

	// Если null или undefined.
	if (lodash.isNil(expression)) {

		logger.warn('Bad request. Possible fraudster!');

		callback(new Error('Can\'t get lessons by request'));

		result = false;

	}

	return result;

}
