'use strict';

/**
 *
 * Created by iretd on 24.03.2017.
 */

var mongoose = require('utils/mongoose');
var validator = require('validator');

var Schema = mongoose.Schema;

var schema = new Schema({
	idUser:           {
		index:    true,
		type:     Schema.Types.ObjectId,
		ref:      'User',
		unique:   true,
		required: true
	},
	confirmationKey:  {
		index:    true,
		unique:   true,
		type:     String,
		validate: {
			validator: validator.isUUID,
			message:   'confirmationKey must be an UUID format!'
		},
		required: true
	},
	result:           {
		type:    Boolean,
		default: false
	},
	createTime:       {
		type:    Date,
		default: Date.now
	},
	confirmationTime: {
		type: Date
	}
});

schema.statics.confirm = confirm;

module.exports = mongoose.model('email.confirmation', schema);

/**
 * Процесс подтверждения.
 */
function confirm(confirmationKey, callback) {

	let emailConfirmationModel = this;

	emailConfirmationModel.findOneAndUpdate({confirmationKey: confirmationKey},
											{
												result:           true,
												confirmationTime: Date.now()
											}, callback);

}
