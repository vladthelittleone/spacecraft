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
	Metrics.calcMetrics(function(userMetrics)
	{
		if (userMetrics)
		{
			Stat.calcMetrics(function(starStatForLesson, meanStatForLessons)
			{
				var lessonMetrics = {};

				if (starStatForLesson)
				{
					lessonMetrics = {
						// параметры звезд для каждого урока в отдельности
						// параметры
						// sum: суммарная оценка урока
						// numb: количество людей поставивших данному уроку оценку
						// min: минимальная оценка
						// max: максимальная оценка
						// mean: средняя оценка
						starStatForLesson: starStatForLesson,
						// среднее кол-во звезд для всех уроков
						meanStatForLessons: meanStatForLessons
					};
				}

				res.send({
					lessonMetrics: lessonMetrics,
					userMetrics: userMetrics
				});
			});
		}
		else
		{
			res.send({error: "Не получилось собрать статистику."});
		}
	});

});

module.exports = router;
