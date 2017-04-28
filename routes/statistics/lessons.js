'use strict';

/**
 * @since 16.02.17
 * @author greezlock
 */

const express = require('express');
const lodash = require('lodash');

const logger = require('utils/log')(module);
const Statistic = require('./../../models/statistic');
const leaderBoardHelper = require('../../utils/helpers/statistics/leaderBoard');
const checkAuthentication = require('./../../middlewares/check-authentication');

const router = express.Router();
module.exports = router;

router.get('/statistics/lessons/leaderBoard', checkAuthentication, function (req, res, next) {

	Statistic.getLeaderBoard(function (error, leaderBoard) {

		if (error) {

			logger.error(error);

			return next(error);

		}

		let idUser = req.user._id;

		leaderBoardHelper.tryToMarkUser({idUser, leaderBoard});

		leaderBoardHelper.prepareForResponse(leaderBoard);

		res.send(leaderBoard);

	});

});
