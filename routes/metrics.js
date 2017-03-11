var express = require('express');
var Cohorts = require('models/cohorts').Cohorts;
var Quiz = require('models/quiz').Quiz;
var router = express.Router();
const logger = require('utils/log')(module);

router.post('/openlessons', function (req, res, next) {

	Cohorts.updateCohort(idUser, function(data, cohortID) {

		if (data) {

			data.cohorts[cohortID].numbClicksOnLesson++;

		}
	});

	res.send({});

});

module.exports = router;
