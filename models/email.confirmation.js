/**
 *
 * Created by iretd on 24.03.2017.
 */

var mongoose = require('utils/mongoose');

var User = require('./user');

var validator = require('validator');

var Schema = mongoose.Schema;

var schema = new Schema({
	idUser:           {
		type:     mongoose.Schema.Types.ObjectId,
		ref:      'User',
		unique:   true,
		required: true
	},
	confirmationKey:  {
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

schema.statics.set = set;
schema.statics.confirm = confirm;
schema.statics.find = find;

module.exports = mongoose.model('email.confirmation', schema);

function set(args, callback) {

	this.update({idUser: args.userId},
				{confirmationKey: args.confirmationKey},
				{
					upsert:              true,
					setDefaultsOnInsert: true
				},
				callback);

}

function find(userId, callback) {

	this.find({idUser: userId}, callback);

}

function confirm(confirmationKey, callback) {

	this.update({confirmationKey: confirmationKey},
				{
					result:           true,
					confirmationTime: Date.now()
				},
				callback);

}
