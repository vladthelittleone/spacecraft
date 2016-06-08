'use strict';

/**
 * Модуль подсказок пользователю.
 *
 * Created by vladthelittleone on 30.11.15.
 */
var angular = require('angular');

var app = angular.module('spacecraft.quick.module', []);

app.config(require('./quick.config'));
app.controller('QuickController', require('./quick.controller'));

