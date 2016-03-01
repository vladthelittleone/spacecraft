/**
 * Created by Ivan on 01.03.2016.
 */
var mongoose = require('utils/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	stat:{
		type: Array
	}
});

exports.Statistic = mongoose.model('Statistic', schema);
