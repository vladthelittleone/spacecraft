var tabHandler = require( './tabHandler.js' );

// Подписываемся на событие смены вкладки.
tabHandler.start();

module.exports = tabHandler;
