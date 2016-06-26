/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */
var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(config.database.uri, config.database.options);

module.exports = mongoose;
