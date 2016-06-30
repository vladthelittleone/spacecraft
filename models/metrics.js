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
	}
});

schema.statics.update = function (idUser, callback) {

	var Metrics = this;

	async.waterfall([
			function (callback) {

				Metrics.findOne({idUser: idUser}, callback)
			},
			function (metrics, callback) {

				if (metrics) {

					callback(metrics);
				}
				else {

					var newMetrics = new Metrics({idUser: idUser});

					newMetrics.save();
				}
			}

		], callback);
};

// выпоняет подсчет метрик
schema.statics.calcMetrics = function (callback) {

	var Metrics = this;

	async.waterfall([

		function (callback) {

			Metrics.find({idUser: idUser}, callback);
		},
		function (metrics) {

			// проверяем удалось ли обнаружить метрики
			if (metrics.length == 0) {

				callback();
			}
			else {

				var sumVisits = 0;
				var sumClickOnLesson = 0;
				var sumClickOnGame = 0;

				metrics.forEach(function (item) {

					sumVisits += item.visits;
					sumClickOnLesson += item.numbClicksOnLesson;
					sumClickOnGame += item.numbClicksOnGame;
				});

				var userNumb = metrics.length;

				var userMetrics = {
					// сумарное количество посещений
					sumVisits: sumVisits,
					// количество пользователей
					userNumb: userNumb,
					// среднее кол-во посещений
					meanVisits: sumVisits / userNumb,
					// среднее кол-во переходов на игру
					meanClickOnGame: sumClickOnLesson / userNumb,
					// среднее кол-во преходов на уроки
					meanClickOnLesson: sumClickOnGame / userNumb
				};

				callback(userMetrics);
			}
		}

	]);
};

exports.Metrics = mongoose.model('Metrics', schema);
