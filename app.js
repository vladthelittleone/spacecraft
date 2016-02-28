const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const httpLogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// Наши модули
const config = require('config');
const mongoose = require('./utils/mongoose');
const logger = require('./utils/log')(module);
const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup (Т.к. у нас уже написан html, лучше пока не юзать движки)
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(httpLogger('dev'));
app.use(bodyParser.json()); // Парсер json в потоках
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Сторедж для сессии.
const MongoStore = require('connect-mongo/es5')(session);

app.use(session({
	secret: config.get('session:secret'), // ABCDE242342342314123421.SHA256
	key: config.get('session:key'),
	resave: config.get('session:resave'),
	saveUninitialized: config.get('session:saveUninitialized'),
	cookie: config.get('session:cookie'),
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

if (app.get('env') === 'development')
{
	app.use(express.static(path.join(__dirname, 'public')));
}
else
{
	app.use(express.static(path.join(__dirname, 'build')));
}

// Мидлвер
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
	var err = new Error('Not Found');
	err.status = 404;
	res.send(err.message);
	res.end();

	// TODO переделать error-handlers
	//next(err);
});

// error handlers
//
// development error handler
// will print stacktrace
//if (app.get('env') === 'development')
//{
//	app.use(function (err, req, res, next)
//	{
//		res.status(err.status || 500);
//		res.render('error', {
//			message: err.message,
//			error: err
//		});
//	});
//}
//
// production error handler
// no stacktraces leaked to user
//app.use(function (err, req, res, next)
//{
//	if (typeof err == 'number')
//	{ // next(404);
//		err = new HttpError(err);
//	}
//
//	logger.error(err);
//	res.status(err.status || 500);
//	res.render('error', {
//		message: err.message,
//		error: {}
//	});
//});


module.exports = app;
