'use strict';

var mongoose = require('mongoose');
var config = require('../../config');
var log = require('../log')(module);

const emailHelpScript = require('./email/help');
const starsHelpScript = require('./stars/help');

mongoose.connect(config.get('database:uri'), config.get('database:options'));

emailHelpScript.getEmailAllRegisteredUsers(function (value) {

	checkArraySize(value, "Users email.", "Users can't find");

	value.forEach(function (item) {

		log.info(item);

	});
});

starsHelpScript.getStarsSummary(function (value) {

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




