'use strict';

/**
 * @since 16.02.17
 * @author greezlock
 */

const express = require('express');
var router = express.Router();

var Statistic = require('./../../models/statistic').Statistic;

const checkAuthentication = require('./../../middlewares/check-authentication');

module.exports = router;

router.get('/statistics/lessons/leaderBoard', checkAuthentication, function (req, res, next) {

	let idUser = req.user._id;

	Statistic.getLeaderboard(idUser, function (error, leaderBoard) {

		if (error) {

			return next(error);

		}

		res.send(leaderBoard);

	});

});
