'use strict';

var lodash = require('lodash');

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 *
 * @param player
 */
function Api(player) {

    const methodsToAPIFromPlayer = ['moveToXY',
                                    'rotateLeft',
                                    'rotateRight',
                                    'fire',
                                    'fireAtXY',
                                    'moveForward',
                                    'scan'];

    var api = lodash.pick(player, methodsToAPIFromPlayer);

    api.isAlive = isAlive;

    return api;

    function isAlive() {

        return player.alive;

    }

}
