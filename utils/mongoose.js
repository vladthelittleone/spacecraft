/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */
var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('database:uri'), config.get('database:options'));

module.exports = mongoose;