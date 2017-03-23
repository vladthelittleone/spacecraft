'use strict';

/**
 * @author Aleksandrov Oleg
 * @since 12.03.17
 */

var angular = require('angular');

var app = angular.module('spacecraft.quiz.module',[]);

app.config(require('./quiz.config'));
app.controller('QuizController', require('./quiz.controller'));
