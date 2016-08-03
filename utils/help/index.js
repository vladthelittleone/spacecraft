'use strict';

var mongoose = require('mongoose');
var config = require('../../config');
var log = require('../log')(module);

var Schema = mongoose.Schema;
var User = mongoose.model('Users', new Schema());
var Statistics = mongoose.model('Statistic', new Schema());

const helpScript = require('./dataBaseHelpScript');

mongoose.connect(config.get('database:uri'), config.get('database:options'));

helpScript.getEmailAllRegisteredUsers(User, function (value) {

	checkArraySize(value, "Users email.", "Users can't find");

	value.forEach(function (item) {

		log.info(item);

	});
});

helpScript.getStarsSummary(Statistics, function (value) {

	checkArraySize(value, "Star statistics find", "Star statistics can't find");

	value.forEach(function (item, i) {

		var userCount = item.userCount;
		var mean = item.sum / userCount;

		log.info("Lesson №" + i +
			     " mean " + mean +
			     " userNumb " + userCount);

	});

	// после выполнения второго запроса обрубаем соеденение с базой
	mongoose.disconnect();
});

function checkArraySize(array, messageCorrect, messageNotCorrect) {

	if (array.length) {

		log.info(messageCorrect);

	}
	else {

		log.info(messageNotCorrect);

	}

}




