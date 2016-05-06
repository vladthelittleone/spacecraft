var express = require('express');
var Metrics = require('models/metrics').Metrics;
var Stat = require('models/statistic').Statistic;
var router = express.Router();

router.post('/opengame', function (req, res, next)
{
	Metrics.update(req.session.user, function (metrics)
	{
		metrics.numbClicksOnGame += 1;

		metrics.save();
	});
});

router.post('/openlessons', function (req, res, next)
{
	Metrics.update(req.session.user, function (metrics)
	{
		metrics.numbClicksOnLesson += 1;

		metrics.save();
	});
});

router.get('/stat', function(req, res, next)
{
	Metrics.calcStatistics(function(sumVisits, userNumb, meanVisits, meanClickOnGame, meanClickOnLesson) {
		console.log("Cумарное количество посещений " + sumVisits +
			        "\nСреднее количество посещений " + meanVisits +
					"\nКоличество пользователей " + userNumb +
					"\nСреднее количество переходов на игру " + meanClickOnGame +
					"\nСреднее количество переходов на уроки " + meanClickOnLesson);
	});

	Stat.calcStatistics(function(key, starStatForLesson, meanStatForLessons) {
		console.log('\nCредняя оценка всех уроков ' + meanStatForLessons + '\n');

		key.forEach(function(item, i)
		{
			var value = starStatForLesson[item];
			console.log('средняя оценка ' + i + " урока " + value.mean);
			console.log('\nминимальная оценка ' + i + " урока " + value.min);
			console.log('\nмаксимальная оценка ' + i + " урока " + value.max);
		});
	});
});

module.exports = router;
