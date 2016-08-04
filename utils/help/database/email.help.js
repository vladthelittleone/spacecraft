'use strict';

var async = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = mongoose.model('Users', new Schema());

var dataBaseRequest = {};

// возвращает мыла всех зареганных юзеров
dataBaseRequest.getEmailAllRegisteredUsers = function (callback) {

	async.waterfall([

		function (_callback) {

			User.find(_callback);

		},
		function (data, _callback) {

			var results = [];

			// вызов find в любом случае вернет коллекцию
			// так что проверять есть ли там что то или нет
			// нет смысла
			data.forEach(function (value) {
				// выкидываем всю лишнюю инфу
				// оставляя только емайлы

				// делаем то что пришло из базы объектом
				var user = value.toObject();

				results.push(user.email);

			});

			_callback(results);
		}

	], callback);
};

module.exports = dataBaseRequest;
