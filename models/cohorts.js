var mongoose = require('utils/mongoose');
var async = require('async');

var Schema = mongoose.Schema;

var schema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	cohorts: {
		type: Array
		// structure
		// {
		//	userNumb:,
		//	lessons: [{lessonID:, stars: }],
		//	numbClicksOnLesson: ,
		//	numbClicksOnGame:,
		//	visits: 0
		//}
	}
});


exports.Cohorts = mongoose.model('Cohorts', schema);
