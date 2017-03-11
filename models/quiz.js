/**
 * @author Aleksandrov Oleg
 * @since 9.03.17
 */

var mongoose = require('utils/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	idUser:          {
		type:     mongoose.Schema.Types.ObjectId,
		ref:      'User',
		required: true
	},
	quizNumber: {
		type: Number
	},
	score: {
		type: Number
	}
});

schema.statics.updateQuizResult = updateQuizResult;
schema.statics.findQuizResult = findQuizResult;

exports.Quiz = mongoose.model('Quiz', schema);

/**
 * Функция обновляет информацию о результате прохождения пользователем опросника.
 * Если записи о прохождении ползователем опросника нет, то запись будет создана.
 */
function updateQuizResult(userId, quizNumber, score, callback) {

	let Quiz = this;

	Quiz.update({

		         idUser: userId,
		         quizNumber: quizNumber

	            },
		        {
					$set: {

						idUser: userId,
						quizNumber: quizNumber,
						score: score

					}
		        },
		        {
					setDefaultsOnInsert: true,
					upsert: true
		        },
            	callback);

}

/**
 * Функция возвращает, результаты всех пройденных пользователем опросников.
 */
function findQuizResult(userId, callback) {

	let Quiz = this;

	Quiz.find({idUser: userId}, callback);

}
