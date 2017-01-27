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
		type:    Number,
		default: 0
	},
	userProgress:    {
		type:    Array,
		default: []
	},
	lessons:         {
		type:    [{
			_id:              false,
			currentSubLesson: Number,
			lessonId:         String,
			subLessonCount:   Number,
			completed:        Boolean,
			stars:            Number,
			lessonStatistics: {
				currentScore:           Number,
				currentRunCount:        Number,
				finalScore:             Number,
				finalRunCount:          Number,
				attemptLessonCount:     Number,
				isUserCanGetBonusScore: Boolean
			}
		}],
		default: []
	}
});

// заносим инфу о том сколько звездочек
// какому уроку было поставленно пользователем
schema.statics.updateLessonStarStatistics = updateLessonStarStatistics;

// возвращает статистику пользователя
schema.statics.getUserStatistics = getUserStatistics;

// Возврат всей статистики.
schema.statics.getLeaderboard = getLeaderboard;

schema.statics.updateTotalFinalScore = updateTotalFinalScore;

// обновение инфы о прохождении пользователем уроков
schema.statics.updateLessonStatistics = updateLessonStatistics;

// Обновление инфы о полученных очках за сегодня
schema.statics.updateUserProgress = updateUserProgress;

exports.Statistic = mongoose.model('Statistic', schema);

/**
 * возвращает статистику пользователя
 */
function getUserStatistics (idUser, callback) {

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
 *                        и будет производиться выборка.
 * @param idUser идентификатор пользователя, по которому будет осуществляться выборка
 *               статистики из БД.
 * @param callback Ожидаемая сигнатура метода callback:
 *                      - error если прозошла какая либо ошибка;
 *                      - statistics статистика, выбранная из БД по указанному пользователю.
 */
function prepareCurrentUserStatistics (modelStatistics, idUser, callback) {

	if (validateParam(idUser, callback)) {

		async.waterfall([

							function (callback) {

								modelStatistics.findOne({idUser: idUser}, callback);

							}

						], callback);

	}

}

function updateUserProgress (idUser, score, callback) {


	// Размер массива очков пользователя за прохождения уроков,
	// так сказать его прогресс,
	// под числом 30 подразумеваются дни,
	// но по факту, привязки по дате пока нет
	const USER_PROGRESS_SIZE_LIMIT = 30;

	// Не строим таблицу для неавторизованных пользователей.
	if (validateParam(idUser, callback) && validateParam(score, callback)) {

		// this.update({
		// 				idUser: idUser
		// 			}, {
		// 				$push: {
		// 					userProgress: {
		// 						$each:  [score],
		// 						// Отрицательное значение дает указание mongodb оставлять
		// 						// в массиве только КРАЙНИЕ N значений массива:
		// 						// https://docs.mongodb.com/v3.0/reference/operator/update/slice/#up._S_slice
		// 						// Это то, что и требуется по логике хранения прогресса пользователя.
		// 						$slice: -USER_PROGRESS_SIZE_LIMIT
		// 					}
		// 				}
		// 			}, callback);

		this.findOneAndUpdate({
								query: {
									idUser: idUser
								},
								update: {
									$push: {
										userProgress: {
											$each:  [score],
											// Отрицательное значение дает указание mongodb оставлять
											// в массиве только КРАЙНИЕ N значений массива:
											// https://docs.mongodb.com/v3.0/reference/operator/update/slice/#up._S_slice
											// Это то, что и требуется по логике хранения прогресса пользователя.
											$slice: -USER_PROGRESS_SIZE_LIMIT
										}
									}
								},
								upsert: true
							}, callback);
	}

}

/**
 * Метод формирования имен пользователей по электронным адресам.
 * Предполагается, что сами электронные адреса задаются в поле name каждого пользователя.
 * @param listOfUsers список пользователей.
 */
function takeNameFromEmail (listOfUsers) {

	listOfUsers.forEach(function (item) {

		if (!item.name) {

			logger.warn('Problem with generating name of user for leaderboard request!!!');

		} else {

			item.name = lodash.first(item.name.split('@'));

		}

	});

}

/**
 * Метод получения таблицы лидеров для указанного пользователя.
 * Указанный пользователь будет помечен в конечной таблице в поле
 * isItMe значением true.
 * Выходной формат таблицы:
 * 1)name имя пользователя в системе;
 * 2)totalFinalScore общее число очков пользователя;
 * 3)isItMe флаг сообщающий пользователю о том, где он расположен
 * в таблице.
 * Коллбэк формирующий из email адресов имена пользователей определен именно в контексте данного
 * метода, так как формирование нужных данных по таблице лидеров целесообразно
 * удерживать именно здесь. Вроде как, нигде больше подобная логика не потребуется.
 */
function getLeaderboard (idUser, callback) {

	// Не строим таблицу для неавторизованных пользователей.
	if (validateParam(idUser, callback)) {

		this.aggregate([{
			$lookup: {
				from:         'users',
				localField:   'idUser',
				foreignField: '_id',
				as:           'user'
			}
		}, {
			$project: {
				totalFinalScore: true,
				isItMe:          {
					$eq: ["$idUser", mongoose.Types.ObjectId(idUser)]
				},
				name:            {
					$arrayElemAt: ['$user.email', 0]
				},
				regDate:         {
					$arrayElemAt: ['$user.created', 0]
				}
			}
		}, {
			$limit: 10
		}, {
			$project: {
				_id:             false,
				name:            true,
				totalFinalScore: true,
				isItMe:          true
			}
		}], function (error, results) {

			if (!error) {

				// Обрабатываем поле с именем (name) каждого пользователя.
				// На данный момент мы складываем туда email адреса, из которых
				// и нужно "вырезать" имена.
				takeNameFromEmail(results);

			}

			callback(error, results);

		});

	}

}

/**
 * Заносим инфу о том сколько звездочек
 * какому уроку было поставленно пользователем.
 */
function updateLessonStarStatistics (idUser, dataForUpdate, callback) {

	var modelStatistics = this;
	// Проверка коректности пришедших данных для обновления.
	// Проверять поля: idUser, dataForUpdate.lessonId и
	// dataForUpdate.stars на undefined или null нет необходимости.
	// Метод update в mongoose сам проверяет параметры на корректность.
	if (validateParam(dataForUpdate, callback)) {

		let fieldStarOfLesson = 'lessons.' + dataForUpdate.lessonId + '.stars';

		modelStatistics.update({
								   idUser: idUser
							   }, {
								   $set: {[fieldStarOfLesson]: dataForUpdate.stars}
							   }, callback);

	}

}

/**
 * Метод сортировки имеющейся статистики по пользователям по следующему критерию:
 *  - сортировка (по убыванию) осуществляется по полю totalFinalScore. Пользователь,
 * с наибольшим числом totalFinalScore, является лучшим.
 * @param modelStatistics модель коллекции статистики, по отношению к которой и будет
 * производиться сортировка.
 * @param callback
 */
function sortStatistics (modelStatistics, callback) {

	// Сортируем данные в statistics по убыванию значения в поле totalFinalScore.
	modelStatistics.aggregate([{$sort: {totalFinalScore: -1}}, {$out: 'statistics'}], callback);

}

function updateTotalFinalScore (idUser, totalFinalScoreValue, callback) {

	if (validateParam(totalFinalScoreValue, callback)) {

		let modelStatistics = this;

		this.update({
						idUser: idUser
					}, {
						$set: {totalFinalScore: totalFinalScoreValue}
					}, {
						setDefaultsOnInsert: true,
						upsert:              true
					}, function (error, resultOfUpdate) {

			// В случае ошибки, resultUpdate.nModified будет равен нулю.
			if (resultOfUpdate.nModified) {

				// Сортируем данные в statistics по убыванию значения в поле totalFinalScore.
				sortStatistics(modelStatistics, callback);

			} else {

				callback(error);
			}

		});

	}

}

/**
 * Обновение инфы о прохождении пользователем уроков.
 */
function updateLessonStatistics (idUser, dataForUpdate, callback) {

	var isDataForUpdateExists = validateParam(dataForUpdate, callback);
	var fieldsAreCorrect = validateParam(dataForUpdate.lesson, callback);

	if (isDataForUpdateExists && fieldsAreCorrect) {

		let modelStatistics = this;

		let lesson = dataForUpdate.lesson;
		let lessonId = dataForUpdate.lesson.lessonId;

		// Обновляем  общее число очков пользователя.
		this.updateTotalFinalScore(idUser, dataForUpdate.totalFinalScore, function (error) {

			if (error) {

				return callback(error);

			}

			let elemOfNecessaryLesson = 'lessons.' + lessonId;

			modelStatistics.update({
									   idUser: idUser
								   }, {
									   $set: {[elemOfNecessaryLesson]: lesson}
								   }, {
									   setDefaultsOnInsert: true,
									   upsert:              true
								   }, callback);

		});

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
function validateParam (expression, callback) {

	var result = true;

	// Если null или undefined.
	if (lodash.isNil(expression)) {

		logger.warn('Bad request. Possible fraudster!');

		// Сообщаем о плохом запросе клиента.
		callback(new Error('Bad request.'));

		result = false;

	}

	return result;

}
