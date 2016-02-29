var path = require('path');
var util = require('util');
var http = require('http');

// Ошибки для выдачи посетителю
function HttpError(status, message)
{
	Error.apply(this, arguments);
	Error.captureStackTrace(this, HttpError);

	this.status = status;
	this.message = message || http.STATUS_CODES[status] || "Error";
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
