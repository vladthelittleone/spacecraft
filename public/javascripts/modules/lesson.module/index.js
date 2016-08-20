'use strict';

/**
 * Модуль, включающий все зависмости, связанные с игрой.
 *
 * @author Skurishin Vladislav
 * @since 30.11.2015
 */
var angular = require('angular');

var app = angular.module('spacecraft.lesson.module', []);

app.config(require('./lesson.config'));
app.controller('LessonController', require('./lesson.controller'));
app.factory('lessonService', require('./lesson.service'));
