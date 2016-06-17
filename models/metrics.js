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

schema.statics.update = function (idUser, callback)
{
	var Metrics = this;

	async.waterfall([
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

exports.Metrics = mongoose.model('Metrics', schema);
