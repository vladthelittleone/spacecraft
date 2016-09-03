/**
 * Created by Ivan on 29.02.2016.
 */
var express = require('express');
var logger = require('../utils/log')(module);

var Statistic = require('models/statistic').Statistic;
var User = require('models/user').User;
var HttpError = require('error').HttpError;
var Cohorts = require('models/cohorts').Cohorts;
var Lodash = require('lodash');
var async = require('async');

var router = express.Router();

// Запись статы о прохождении уроков юзером
router.post('/lessons', function (req, res, next) {

	let userId = req.session.user;
	let dataForUpdate = req.body;

	Statistic.updateLessonStatistics(userId, dataForUpdate, function (err) {

		if (err) {

			logger.warn(err);

			next(new HttpError(400, "Ошибка с сохранением урока"));

		}

	});

	res.send([]);

});

// Получение статистики юзера о прохождении уроков
router.get('/lessons', function (req, res, next) {

	Statistic.getUserStatistics(req.session.user, function (err, result) {

		if (err) {

			return next(new HttpError(400, "Ошибка с получением статистики пользователя."));

		}

		if (result) {

			// Отправляем массив уроков и финальное число очков по всем урокам
			// отделными полями.
			res.json({
				lessons:         result.lessons,
				totalFinalScore: result.totalFinalScore
			});

		} else {

			res.send([]);

		}

	});

});

router.post('/lessons/stars', function (req, res, next) {

	Cohorts.updateCohort(req.session.user, function (data, cohortID) {

		if (data) {

			var lessonsID = req.body.idLesson;
			var lessons = data.cohorts[cohortID].lessons;
			var lesson = lessons[lessonsID];

			var star = req.body.stars;

			if (lesson) {

				lesson.numb += 1;
				lesson.starsSum += star;

			} else {

				lessons[lessonsID] = {

					numb:     1,
					starsSum: star

				}

			}

		}

	});

	let userId = req.session.user;
	let dataForUpdate = req.body;

	Statistic.updateLessonStarStatistics(userId, dataForUpdate, function (err) {

		if (err) {

			return next(new HttpError(400, "Ошибка сохранения оценки урока"));

		}

		res.sendStatus(200);

	});

});


/**
 * Метод подготовки доски почета.
 * Его основная задача - сформировать доску почета с явным указанием в ней
 * текущего пользователя, дабы клиент смог на совей стоороне найти себя :)
 * Также, помимо всего, метод учитывает конечный размер доски почета и формирует
 * корректные номера расположения каждого пользователя в ней (включая текущего, даже
 * если он не вошел в список лучших игроков).
 * @param idUsersAndNicknamesArr массив объектов, каждый из которых имеет формат:
 *                               - idUser;
 *                               - nickname (прозвище пользователя на уровне сервиса);
 *                               - totalFinalScore (общее число заработанных очков за все уроки).
 * @returns {Array} возвращает таблицу лидеров в следующем формате:
 * 					- pos (позиция пользователя в доске почета);
 * 					- nickname (-//-);
 * 				 	- totalFinalScore (-//-);
 * 				 	- isItMe (данное свойство определено и установлено в true в случае,
 * 				 			  когда текущая строка относится к текущему пользователю).
 */
function prepareLeaderboard(idUsersAndNicknamesArr, currentUserId) {

	// TODO
	// 1. ГОВНОКОД ДЕТЕКТЕД. ПЕРЕДЕЛАТЬ.
	// 2. заменить поле _id на pos !!!!!
	// Флаг нахождения текущего пользователя в таблице лидеров.

	const LEADERBOARD_USERS_LIMIT = 10;

	var isCurrentUserInLeaderboard = false;

	var leaderboard = [];


	for (let index = 0; index < idUsersAndNicknamesArr.length; index++) {

		let elem = idUsersAndNicknamesArr[index];

		let posInLeaderborad = index + 1;

		if (posInLeaderborad <= LEADERBOARD_USERS_LIMIT) {

			// equals обязательно.
			if (elem._id.equals(currentUserId)) {

				isCurrentUserInLeaderboard = true;
				elem.isItMe = true;

			}

			elem._id = posInLeaderborad;

			leaderboard[index] = elem;

		}
		else {

			if (isCurrentUserInLeaderboard) {

				break;

			}

			if (elem._id.equals(currentUserId)) {

				isCurrentUserInLeaderboard = true;
				elem.isItMe = true;

				elem._id = posInLeaderborad;

				leaderboard[leaderboard.length] = elem;

			}

		}


	}

	return leaderboard;

}


/**
 * Метод полагается на авторизованного пользователя,
 * так как в таблице лидеров осуществляется поиск и отметка самого
 * пользователя, который и запросил данную таблицу.
 */
router.post('/lessons/leaderboard', function(req, res, next) {

	async.waterfall( [

		function(callback) {

			Statistic.getUsersWithTotalFinalScores(callback);

		},

		function(usersWithTotalFinalScores, callback) {

			// Получаем id пользователей, по которым у нас имеются подсчитанные очки.
			var usersId = Lodash.map(usersWithTotalFinalScores, '_id');

			// Запрашиваем "прозвища" этих пользователей.
			User.getNicknamesByUsersId(usersId, function(err, idUsersAndNicknamesArr) {

				if (err) {

					return callback(err);

				}

				// Добавляем к массиву с idUser и ников их окончательные очки.
				// в idUsersAndNicknamesArr появится поле totalFinalScores
				Lodash.merge(idUsersAndNicknamesArr, usersWithTotalFinalScores);

				res.send(prepareLeaderboard(idUsersAndNicknamesArr,req.session.user));

			});

		}], function(err) {

				if (err) {

					return next(err);

			}

		});

});

module.exports = router;
