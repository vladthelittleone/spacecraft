'use strict';

/**
 * @since 16.02.17
 * @author greezlock
 */

const express = require('express');
var router = express.Router();

var lodash = require('lodash');

var Statistic = require('./../../models/statistic').Statistic;

var leaderBoardHelper = require('../../utils/help/statistics/leaderBoard');

const checkAuthentication = require('./../../middlewares/check-authentication');

module.exports = router;

router.get('/statistics/lessons/leaderBoard', checkAuthentication, function (req, res, next) {

	Statistic.getLeaderBoard(function (error, leaderBoard) {

		if (error) {

			return next(error);

		}

		let idUser = req.user._id;

		leaderBoardHelper.tryToMarkUser({idUser, leaderBoard});

		leaderBoardHelper.prepareForResponse(leaderBoard);

		res.send(leaderBoard);

	});

});
