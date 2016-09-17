'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('config');
var Cohorts = require ('../../models/cohorts').Cohorts;
var User = require ('../../models/user').User;
var Statistic = require ('models/statistic').Statistic;

var AuthError = require ('error').AuthError;
var HttpError = require ('error').HttpError;

var vk = {};

module.exports = vk;

/**
 * если пришла AuthError меняем ее тип на HttpError
 */
function changeErrorType (err) {

	if(err instanceof AuthError) {

		return new HttpError (403, err.message);

	}

	return err;
}

vk.login = new VKStrategy(config.get('vkStrategySettings'),

	(accessToken, refreshToken, params, profile, next) => {

		User.findOrCreateVKUser(profile.id, params.email, (err, user, isRegistration) => {

			// проверяем прошла ли авторизация успешно
			if (!err) {

				if (isRegistration) {

					let initTotalFinalScore = 0;
					let userId = user._doc._id;

					/**
					 * Регистрируем пользователя в статистике с начальной историей прохождения уроков.
					 */
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

				} else {
					
					Cohorts.updateCohort (user._id, (data, cohortID) => {

						if(data) {

							data.cohorts[cohortID].visits++;

						}

					});
				}

			}

			next (changeErrorType (err), user);

		});

	}
);
