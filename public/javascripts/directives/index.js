'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение директив.
 */
var app = require('angular').module('spacecraft');

app.directive('bbotBoard', require('./bot-board.directive'));
app.directive('documentation', require('./documentation.directive'));
app.directive('diagram', require('./diagram.directive'));
app.directive('gameCanvas', require('./game-canvas.directive'));
app.directive('lessonBoard', require('./lesson-board.directive'));
app.directive('diagramBoard', require('./diagram-board.directive'));
app.directive('repeatFinished', require('./repeat-finished.directive'));
app.directive('settings', require('./settings.directive'));
app.directive('stars', require('./stars.directive'));
app.directive('statisticsLessonEnd', require('./statistics-lesson-end.directive'));
app.directive('disqus', require('./disqus.directive'));
app.directive('quiz', require('./quiz.directive'));
app.directive('lessonTable', require('./lesson-table.directive'));
app.directive('spinner', require('./spinner'));

app.directive('validateEmail', require('./validation/validate.email.directive'));
