'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;

var vk = {};

module.exports = vk;

vk.login = new VKStrategy({

		clientID:     "5624932",
		clientSecret: "7SItUJV1h4mDSC0PiXkc",
		callbackURL:  "http://localhost:3000/vk/callback",
		apiVersion: '5.17',
		scope: ['email'],
		profileFields: ['email']
	},
	(accessToken, refreshToken, params, profile, done) => {

		console.log(" FUCK " + accessToken + " " + refreshToken + " " + profile + " ");

		done(null, profile);

	}
);
