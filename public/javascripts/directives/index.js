'use strict';

/**
 * Created by vladthelittleone on 07.06.16.
 *
 * Подключение директив.
 */
var app = require('angular').module('spacecraft');

app.directive('bbotBoard', require('./shared/bot-board.directive'));
app.directive('diagram', require('./shared/diagram.directive'));
app.directive('gameCanvas', require('./shared/game-canvas.directive'));
app.directive('repeatFinished', require('./shared/repeat-finished.directive'));
app.directive('settings', require('./shared/settings.directive'));
app.directive('stars', require('./shared/stars.directive'));
app.directive('disqus', require('./shared/disqus.directive'));
app.directive('spinner', require('./shared/spinner'));

app.directive('lessonBoard', require('./lesson/board.directive'));
app.directive('diagramBoard', require('./lesson/diagram.directive'));
app.directive('endStatistics', require('./lesson/end-statistics.directive'));
app.directive('lessonTable', require('./lesson-table.directive'));
app.directive('quiz', require('./lesson/quiz.directive'));

app.directive('validateEmail', require('./validation/validate.email.directive'));
