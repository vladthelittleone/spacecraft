'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('config');
var User = require ('../../models/user');

var authenticationHelper = require('./../../utils/helpers/authentication.helper');

var vk = {};

module.exports = vk;

vk.login = new VKStrategy(config.get('vkStrategySettings'),

	(accessToken, refreshToken, params, profile, next) => {

		User.findOrCreateVKUser(profile.id, params.email, profile.displayName, (err, user, isRegistration) => {

			// проверяем прошла ли авторизация успешно
			if (!err) {

				if (isRegistration) {

					authenticationHelper.updateTotalFinalScore(user);

				}

			}

			next (err, user);

		});

	}
);
