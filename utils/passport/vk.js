'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('config');
var Cohorts = require ('../../models/cohorts').Cohorts;
var User = require ('../../models/user').User;

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

		User.findOrCreateVKUser(profile.id, params.email, (err, user, isNeedUpdateCohort) => {

			// проверяем прошла ли авторизация успешно
			if(!err && isNeedUpdateCohort) {

				Cohorts.updateCohort (user._id, (data, cohortID) => {

					if(data) {

						data.cohorts[cohortID].visits++;

					}

				});

			}

			next (changeErrorType (err), user);

		});

	}
);
