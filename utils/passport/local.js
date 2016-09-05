'use strict';

var Cohorts = require('../../models/cohorts').Cohorts;
var User = require ('../../models/user').User;
var LocalStrategy = require ('passport-local').Strategy;

var AuthError = require ('error').AuthError;
var HttpError = require ('error').HttpError;

var local = {};

module.exports = local;

// имена полей в которых приходят мыло и пароль
var localStrategyReqParam = {

	usernameField: 'email',
	passwordField: 'password'

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
	function (email, password, next) {

		User.authorize (email, password, function (err, user) {

			// проверяем прошла ли авторизация успешно
			if (!err) {

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
	function (email, password, next) {

		User.registration (email, password, function (err) {

			next (changeErrorType (err), email);

		});
});
