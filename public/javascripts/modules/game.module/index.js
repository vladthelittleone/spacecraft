'use strict';

/**
 * Модуль, включающий все зависмости, связанные с игрой.
 *
 * Created by vladthelittleone on 30.11.15.
 */
var angular = require('angular');

var app = angular.module('spacecraft.game.module', []);

app.config(require('./game.config'));
app.controller('GameController', require('./game.controller'));
app.factory('gameService', require('./game.service'));
