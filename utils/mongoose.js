/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */
var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('database:uri'), config.get('database:options'));

mongoose.set('debug', config.get('database:debug'));

module.exports = mongoose;
