/**
 * Created by Ivan on 01.03.2016.
 */
var mongoose = require('utils/mongoose');

var Schema = mongoose.Schema;

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

exports.Statistic = mongoose.model('Statistic', schema);
