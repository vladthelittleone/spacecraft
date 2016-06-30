'use strict';

var mongoose = require('utils/mongoose');
var async = require('async');
var User = require('models/user').User;

var Schema = mongoose.Schema;

var schema = new Schema({

	date: {
		type: Date,
		default: Date.now
	},
	cohorts: {
		type: Array
		//	lessons: [{lessonID:, stars: }],
		//	numbClicksOnLesson: ,
		//	visits:
	}
});

// функция возвращает сегоднешнюю дату,
// при этом время установленно на 0.0:0
function getTodayDate () {

	return (new Date()).setHours(0, 0, 0, 0);
}

// превращаем дату в число, по которому
// будет храниться инфа в массиве
function dateToInt (date) {

	return date.getMonth();
}

function getEmptyCohorts (date, arr) {

	var array = arr? arr : [];

	array[date] = {

		numbClicksOnLesson: 0,
		visits: 0,
		lessons: []
	};

	return array;
}

schema.statics.updateCohort = function (userID, callback) {

	var Cohort = this;

	User.getUserCreationDate(userID, function(createdDate) {

		if (createdDate) {

			var todayDate = getTodayDate();

			async.waterfall(
			[
				function (callback) {

					Cohort.findOne ({date: todayDate}, callback);
				},
				function (cohort) {

					var cohortID = dateToInt(createdDate);

					if (!cohort) {

						var newCohort = new Cohort({

							date: todayDate,
							cohorts: getEmptyCohorts(cohortID)
						});

						callback(newCohort, cohortID);

						newCohort.save();
					}
					else {

						var data = cohort.cohorts;

						if (!data[cohortID]) {

							cohort.cohorts = getEmptyCohorts(cohortID, data);
						}

						callback(cohort, cohortID);

						// TODO: исправить при оптимизации
						var cohortToUpdate = {};
						cohortToUpdate = Object.assign(cohortToUpdate, cohort._doc);
						delete cohortToUpdate._id;

						Cohort.update({_id: cohort._id}, cohortToUpdate, {upsert: true}, function (err) {});
					}
				}
			]);
		}
		else
		{
			callback(null);
		}
	});
};

exports.Cohorts = mongoose.model('Cohorts', schema);
