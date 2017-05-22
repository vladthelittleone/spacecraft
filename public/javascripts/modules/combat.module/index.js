'use strict';

/**
 * Модуль, включающий все зависмости, связанные с игрой.
 *
 * @author Skurishin Vladislav
 * @since 30.11.2015
 */
var angular = require('angular');

var app = angular.module('spacecraft.combat.module', []);

app.config(require('./combat.config'));
app.controller('CombatController', require('./combat.controller'));
