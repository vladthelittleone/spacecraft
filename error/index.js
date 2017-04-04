var path = require('path');
var util = require('util');
var http = require('http');

var lodash = require('lodash');

const HttpStatus = require('http-status-codes');

// Ошибки для выдачи посетителю
function HttpError(status, message)
{
	Error.apply(this, arguments);
	Error.captureStackTrace(this, HttpError);

	this.status = status;

	// Если сообщение определено явно, то привязываем его к объекту.
	// В противном случае, сообщение указывать не требуется, т.к. клиент, в такой ситуации,
	// способен САМ вывести сообщение, в случае пустого тела ответа.
	if (!lodash.isNil(message)) {

		this.message = message;

	}
}

// Ошибка авторизации
function AuthError(message)
{
	Error.apply(this, arguments);
	Error.captureStackTrace(this, AuthError);

	this.message = message;
}

util.inherits(HttpError, Error);
util.inherits(AuthError, Error);

HttpError.prototype.name = 'HttpError';
AuthError.prototype.name = 'AuthError';

exports.HttpError = HttpError;
exports.AuthError = AuthError;
