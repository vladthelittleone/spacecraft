'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;

var User = require ('../../models/user');
const config = require('config');
var userHelper = require('./../helpers/authentication/user');

var vk = {};

module.exports = vk;

vk.login = new VKStrategy(config.get('vkStrategySettings'),

	(accessToken, refreshToken, params, profile, next) => {

		User.findOrCreateVKUser(profile.id, params.email, profile.displayName, (err, user, isRegistration) => {

			// проверяем прошла ли авторизация успешно
			if (!err) {

				if (isRegistration) {

					userHelper.initTotalFinalScore(user);

					// Устанавливаем флаг того, что это НОВЫЙ vk user.
					// Анализируется далее, следующим middleware'ом (для редиректа пользователя на первый урок).
					user.isNew = true;

				}

			}

			next (err, user);

		});

	}
);
