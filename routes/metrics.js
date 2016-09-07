var express = require('express');
var Cohorts = require('models/cohorts').Cohorts;
var router = express.Router();

router.post('/openlessons', function (req, res, next) {

	Cohorts.updateCohort(req.user, function(data, cohortID) {

		if (data) {

			data.cohorts[cohortID].numbClicksOnLesson++;

		}
	});

	res.send({});

});

module.exports = router;
