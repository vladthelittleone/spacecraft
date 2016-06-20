'use strict';

/**
 * Модуль, отвечающий за окно выбора уроков.
 *
 * Created by vladthelittleone on 30.11.15.
 */
var angular = require('angular');

var app = angular.module('spacecraft.lessons.module', []);

app.config(require('./lessons.config'));
app.controller('LessonsController', require('./lessons.controller'));
