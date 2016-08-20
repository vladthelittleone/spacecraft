'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение директив.
 */
var app = require('angular').module('spacecraft');

app.directive('bbotBoard', require('./bot-board.directive'));
app.directive('documentation', require('./documentation.directive'));
app.directive('gameCanvas', require('./game-canvas.directive'));
app.directive('lessonBoard', require('./lesson-board.directive'));
app.directive('repeatFinished', require('./repeat-finished.directive'));
app.directive('settings', require('./settings.directive'));
app.directive('stars', require('./stars.directive'));
