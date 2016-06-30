/**
 * Created by Ivan on 01.03.2016.
 */
var mongoose = require('utils/mongoose');
var async = require('async');

var Schema = mongoose.Schema;

var schema = new Schema({
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
		required: true
	},
	lessons: {
		type: Array
	}
});

function calcMetrics(statistic)
{
	var numb = 0;
	var key = [];
	var starStatForLesson = {};
	var meanStatForLessons = 0;

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

	return {
		starStatForLesson: starStatForLesson,
		meanStatForLessons: meanStatForLessons
	};
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
		function (statistic)
		{
			if (statistic.length == 0)
			{
				callback();
			}
			else
			{
				callback(calcMetrics(statistic));
			}
		}
	]);
};

// выберамем пользователей, сортирую по количеству очков набраных в игре
schema.statics.getUserWithBestScore = function (callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function (callback)
		{
			// Join запрос, соедниям 2 таблицы статистику и юзеров
			// Берем не пустые поля макс очков и сортируем по убыванию
			Statistic.find(({ maxScore: { $ne: null } }))
				.populate('idUser')
				.sort('-maxScore')
				.exec(callback);
		}
	], callback);
};


// заносим инфу о том сколько звездочек
// какому уроку было поставленно пользователем
schema.statics.updateLessonStarStatistics = function (req, callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function(callback)
		{
			Statistic.findOne({idUser: req.session.user}, callback);
		},
		function(result, callback)
		{
			var lessons = result.lessons;
			var lesId = req.body.idLesson;

			lessons[lesId].stars = req.body.stars;

			Statistic.update(
			{
				idUser: req.session.user
			},
			{
				lessons: lessons
			},
			{
				multi: true
			}, callback);
		}],
		callback);
};

// возвращает статистуку пользователя
schema.statics.getUserStatistics = function (id, callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function (callback)
		{
			Statistic.findOne({idUser: id}, callback);
		}

	], callback);
};

// обновение инфы о прохождении пользователем уроков
schema.statics.updateLessonStatistics = function (id, req, callback)
{
	var Statistic = this;

	async.waterfall(
	[
		function (callback)
		{
			// Ищем статистику юзера в базе
			Statistic.findOne({idUser: id}, callback);
		},
		function(result, callback)
		{
			var lessons = req.body;
			var lesId = req.body.lessonId;

			// Если в базе была стата об уроках
			if(result && result.lessons)
			{
				lessons = result.lessons;
				lessons[lesId] = req.body;
				lessons[lesId].completed = req.body.completed || lessons[lesId].completed;
			}

			// Апдейт записи о статистики. создание новой записи если ее нет
			Statistic.update({idUser: id},
			{
				lessons: lessons
			},
			{
				upsert: true,
				multi: true
			}, callback);
		}],
		callback);
};

exports.Statistic = mongoose.model('Statistic', schema);
