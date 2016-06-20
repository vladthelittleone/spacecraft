'use strict';

/**
 * Модуль результатов пользователя.
 *
 * Created by vladthelittleone on 30.11.15.
 */
var angular = require('angular');

var app = angular.module('spacecraft.result.module', []);

app.config(require('./result.config'));
app.controller('ResultController', require('./result.controller'));

