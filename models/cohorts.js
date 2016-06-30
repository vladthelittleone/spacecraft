'use strict';

var mongoose = require('utils/mongoose');
var async = require('async');
var User = require('models/user').User;

var Schema = mongoose.Schema;

var schema = new Schema({

	date: {
		type: Date
	},
	cohorts: {
		type: Array
		//	lessons: [{numb:, starsNumb: }],
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

// возвращает набор полей, которые должны быть в когорте
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

			// сегоднящняя дата
			var todayDate = getTodayDate();

			async.waterfall(
			[
				function (_callback) {

					Cohort.findOne ({date: todayDate}, _callback);
				},
				function (data) {

					var cohortID = dateToInt(createdDate);

					if (!data) {

						// создает когорту
						var newData = new Cohort({

							date: todayDate,
							cohorts: getEmptyCohorts(cohortID)
						});

						// выполняем необходимые опреции над данными
						callback(newData, cohortID);

						newData.save();
					}
					else {

						var _cohorts = data.cohorts;
						
						// проверяем наличие необходимой кагорты
						if (!_cohorts[cohortID]) {

							data.cohorts = getEmptyCohorts(cohortID, _cohorts);
						}
						
						// выполняем необходимые опреции над данными
						callback(data, cohortID);

						// TODO: исправить при оптимизации
						var dataToUpdate = {};
						dataToUpdate = Object.assign(dataToUpdate, data._doc);
						delete dataToUpdate._id;

						Cohort.update({_id: data._id}, dataToUpdate, {upsert: true}, function (err) {});
					}
				}
			]);
		}
		else {

			callback(null);
		}
	});
};

exports.Cohorts = mongoose.model('Cohorts', schema);
