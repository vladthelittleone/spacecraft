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
	visits: {
		type: Number,
		required: true,
		default: 0
	},
	lastEntryDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	numbClicksOnLesson: {
		type: Number,
		required: true,
		default: 0
	},
	numbClicksOnGame: {
		type: Number,
		required: true,
		default: 0
	}
});

schema.statics.update = function (idUser, callback)
{
	var Metrics = this;

	async.waterfall(
		[
			function (callback)
			{
				Metrics.findOne({idUser: idUser}, callback)
			},
			function (metrics, callback)
			{
				if (metrics)
				{
					callback(metrics);
				}
				else
				{
					var newMetrics = new Metrics({idUser: idUser});
					newMetrics.save();
				}
			}

		], callback);
};

schema.statics.calcMetrics = function (callback)
{
	var Metrics = this;

	async.waterfall(
		[
			function (callback)
			{
				Metrics.find(callback);
			},
			function (metrics)
			{
				if (metrics.length == 0)
				{
					callback();
				}
				else
				{
					var sumVisits = 0;
					var sumClickOnLesson = 0;
					var sumClickOnGame = 0;

					metrics.forEach(function (item) {
						sumVisits += item.visits;
						sumClickOnLesson += item.numbClicksOnLesson;
						sumClickOnGame += item.numbClicksOnGame;
					});

					var userNumb = metrics.length;

					var meanVisits = sumVisits / userNumb;
					var meanClickOnLesson = sumClickOnLesson / userNumb;
					var meanClickOnGame = sumClickOnGame / userNumb;

					callback(sumVisits, userNumb, meanVisits, meanClickOnGame, meanClickOnLesson);
				}
			}

		]);
};

exports.Metrics = mongoose.model('Metrics', schema);
