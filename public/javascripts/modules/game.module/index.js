'use strict';

/**
 * Модуль, включающий все зависмости, связанные с игрой.
 *
 * @author Skurishin Vladislav
 * @since 30.11.2015
 */
var angular = require('angular');

var app = angular.module('spacecraft.game.module', []);

app.config(require('./game.config'));
app.controller('GameController', require('./game.controller'));
app.factory('gameService', require('./game.service'));
