/**
 *
 * Created by iretd on 24.03.2017.
 */

var mongoose = require('utils/mongoose');

var User = require('./user');

var Schema = mongoose.Schema;

var schema = new Schema({

	session: {
		passport: {
			user: {
				type:     Schema.Types.ObjectId,
				ref:      'User',
				unique:   true,
				required: true
			}
		}
	}

});

schema.statics.removeAllByUserId = removeAllByUserId;

module.exports = mongoose.model('Session', schema);

/**
 * Удаляет все сессии по указанному userId.
 *
 * Реализация удаления сессий опирается на то, что привязку
 * данных по пользователю к сессии осуществляет библиотека passport.
 */
function removeAllByUserId(userId, callback) {

	this.remove({
					'session.passport.user': userId
				}, callback);

}
