/**
 * Created by Ivan on 01.03.2016.
 */
var mongoose = require('utils/mongoose');

var Schema = mongoose.Schema;
var async = require('async');

var schema = new Schema({
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
		required: true
	},
	stat: {
		type: Array
	},
	maxScore: {
		type: Number
	},
	lessons: {
		type: Array
	}
});

function calcMetrics(statistic, starStatForLesson, meanStatForLessons, numb, key)
{
	statistic.forEach(function (item)
	{
		item.lessons.forEach(function (value)
		{
			if (value.stars)
			{
				var lessonID = value.lessonId;
				var lessonStat = starStatForLesson[lessonID];
				var stars = value.stars;

				meanStatForLessons += stars;
				numb += 1;

				if (lessonStat)
				{
					lessonStat.sum += value.stars;
					lessonStat.numb += 1;

					// update min/max
					if (stars < lessonStat.min)
					{
						lessonStat.min = stars;
					}
					else if (stars > lessonStat.max)
					{
						lessonStat.max = stars;
					}
				}
				else
				{
					key.push(lessonID);

					starStatForLesson[lessonID] =
					{
						sum: stars,
						numb: 1,
						min: stars,
						max: stars,
						mean: 0
					};
				}
			}
		});
	});

	meanStatForLessons /= numb;

	// calc mean
	key.forEach(function (item)
	{
		var value = starStatForLesson[item];

		value.mean = value.sum / value.numb;
	});
}

schema.statics.calcMetrics = function (callback)
{
	var Statictics = this;

	async.waterfall(
	[
		function (callback)
		{
			Statictics.find(callback);
		},
		function (statistic) {
			if (statistic.length == 0)
			{
				callback();
			}
			else
			{
				var starStatForLesson = {};
				var key = [];

				var meanStatForLessons = 0;
				var numb = 0;

				calcMetrics(statistic, starStatForLesson, meanStatForLessons, numb, key);

				callback(starStatForLesson, meanStatForLessons);
			}
		}
	]);
};

exports.Statistic = mongoose.model('Statistic', schema);
