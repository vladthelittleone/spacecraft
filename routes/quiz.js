/**
 * @author Aleksandrov Oleg
 * @since 11.03.17
 */

var Quiz = require('models/quiz').Quiz;
var express = require('express');
var router = express.Router();
const logger = require('utils/log')(module);

module.exports = router;

router.post('/update', function (req, res, next) {

	let idUser = req.user._id;

	let quizNumber = req.query.quizNumber;
	let score = req.query.score;

	if(quizNumber && score) {

		Quiz.updateQuizResult(idUser, req.query.quizNumber, req.query.score, function (err, result) {

			if(err) {

				logger.warn("Quiz can't update. Check code." + err)

			}

		});
	}

	res.sendStatus(200);

});

router.get('/result', function (req, res, next) {

	let idUser = req.user._id;

	Quiz.findQuizResult(idUser, function (err, quizResult) {

		if(!err && quizResult) {

			res.send(quizResult);

		}
		else {

			res.send([]);

		}

	});

});
