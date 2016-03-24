var mongoose = require('utils/mongoose');

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
		default: 1
	},
	lastEntryDate: {
		type: Date,
		default: Date.now
	},
	numbClicksOnLesson: {
		type: Number,
		default: 0
	},
	numbClicksOnGame: {
		type: Number,
		default: 0
	}
});

exports.Statistic = mongoose.model('Metrics', schema);
