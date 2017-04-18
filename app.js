'use strict';

const express = require('express');

const app = express();

const resourcesFolderName = app.get('env') === 'development' ? 'public' : 'build';

const compression = require('compression');

const HttpStatus = require('http-status-codes');

app.use(compression());

const passport = require('passport');
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

require('./utils/passport')();

var localStrategy = require('./utils/passport/local');
var vkStrategy = require('./utils/passport/vk');

var maxHeap = 0;

app.use(require('./middlewares/send-http-error'));

// view engine setup (Т.к. у нас уже написан html, лучше пока не юзать движки)
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, resourcesFolderName, 'favicon.ico')));
app.use(httpLogger('dev'));
app.use(bodyParser.json()); // Парсер json в потоках
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Подключаем статику (картинки, js скрипты, аудио и т.д.)
app.use(express.static(path.join(__dirname, resourcesFolderName)));

// Сторедж для сессии.
const MongoStore = require('connect-mongo')(session);

app.use(session({
					secret:            config.get('session:secret'), // ABCDE242342342314123421.SHA256
					key:               config.get('session:key'),
					resave:            config.get('session:resave'),
					saveUninitialized: config.get('session:saveUninitialized'),
					cookie:            config.get('session:cookie'),
					rolling:           config.get('session:rolling'),
					store:             new MongoStore({
						mongooseConnection: mongoose.connection,
						stringify: false
					})
				}));

// init passportJS
app.use(passport.initialize());
app.use(passport.session());

passport.use('local-login', localStrategy.login);
passport.use('vk-login', vkStrategy.login);

// инициализируем api;
require('./routes')(app);

// Выдаем стартовую страницу ангуляра,на случай неразрешения роута (для html5 mode).
app.use('/*', function (req, res) {

	res.sendFile(path.join(__dirname, resourcesFolderName, 'index.html'));

});

const HttpError = require('error').HttpError;

app.use(function (err, req, res, next) {

	// На случай, если из какого-либо middleware выпала ошибка, отличная от числа или HttpError.
	// Это говорит о том, что в err скрыт объект, который создала какая-либо сторонняя библиотека (к примеру, mongoose).
	// Нет необходимости раскрывать ее описание пользователю. Достаточно будет скрыть ее за 500 кодом.
	if (!err instanceof HttpError && !typeof err == 'number') {

		err = HttpStatus.INTERNAL_SERVER_ERROR;

	}

	// Проверка на число. У нас устоялся подход, что для удобства, в некоторых местах кода,
	// в качестве ошибки мы просто указываем Http код.
	if (typeof err == 'number') {

		err = new HttpError(err);

	}

	if (app.get('env') === 'development') {

		logger.error(err);

	}

	// middlewares/sendHttpError
	res.sendHttpError(err);

});

if (app.get('env') === 'development') {

	setInterval(function () {

					var heap = process.memoryUsage().heapUsed;

					maxHeap = maxHeap < heap ? heap : maxHeap;

					logger.info('Heap size: ' + heap + ', maximum heap size: ' + maxHeap);

				},
				10000);

}

module.exports = app;
