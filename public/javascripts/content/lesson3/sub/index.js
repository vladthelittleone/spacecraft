'use strict';

// Зависимсоти
var loadingSpaceCraft= require('./1');
var goToTurret = require('./2');
var loadingTurret = require('./3');
var goToStock = require('./4');
var loadingStock = require('./5');

/**
 * Created by vaimer on 31.01.17.
 */

module.exports = [loadingSpaceCraft, goToTurret, loadingTurret, goToStock, loadingStock];
