'use strict';

var Cohorts = require ('../../models/cohorts').Cohorts;
var User = require ('../../models/user').User;
var LocalStrategy = require ('passport-local').Strategy;
var Statistic = require ('models/statistic').Statistic;
var valid = require('validator');

const logger = require ('utils/log') (module);

var AuthError = require ('error').AuthError;
var HttpError = require ('error').HttpError;

var local = {};

module.exports = local;

// имена полей в которых приходят мыло и пароль
var localStrategyReqParam = {

	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true

};

// если пришла AuthError меняем ее тип на HttpError
function changeErrorType (err) {

	if(err instanceof AuthError) {

		return new HttpError (403, err.message);

	}

	return err;
}

// стратегия для локальной авторизации
local.login = new LocalStrategy (localStrategyReqParam,
	(req, email, password, next) => {

		var normalizeEmail = valid.normalizeEmail(email);

		User.authorize (normalizeEmail, password, (err, user) => {

			// проверяем прошла ли авторизация успешно
			if(!err) {

				Cohorts.updateCohort (user._id, function (data, cohortID) {

					if(data) {

						data.cohorts[cohortID].visits++;

					}
				});

			}

			next (changeErrorType (err), user);

		});

	});

// стратегия для регистрации пользователя
local.registration = new LocalStrategy (localStrategyReqParam,
	(req, email, password, next) => {

		var normalizeEmail = valid.normalizeEmail(email);
		var isSubscribeOnEmail = req.body.isSubscribeOnEmail;

		User.registration (normalizeEmail, password, isSubscribeOnEmail, (err, user) => {

			if(err) {

				return 	next (changeErrorType (err), email);

			}

			let userId = user._doc._id;
			let initTotalFinalScore = 0;

			// Регистрируем пользователя в статистике с начальной историей прохождения уроков.
			Statistic.updateTotalFinalScore (userId, initTotalFinalScore, (error) => {

				// Если произошла ошибка в процессе сохранения статистики, достаточно лишь
				// отписать об этом в лог.
				// На сам процесс регистрации это никак не повлияет, так что спокойно отвечаем
				// пользователю, даже при ошибке.
				if(error) {

					logger.info ('some problem with save of statistics for the new registered user: ',
								 error);

				}
			});

		});

	});
