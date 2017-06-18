/**
 *
 * Created by iretd on 18.06.2017.
 */

"use strict";

var mongoose = require('utils/mongoose');
const esprima = require('esprima');

var Schema = mongoose.Schema;

var schema = new Schema({
    idUser:           {
        index:    true,
        type:     Schema.Types.ObjectId,
        ref:      'User',
        required: [true, 'Не указан пользователь']
    },
    idCombat: {
        type:     Schema.Types.Number,
        sparse: true,
        required:  [true, 'Не указан номер сражения']
    },
    code:  {
        index:    true,
        type:     String,
        validate: {
            validator: isJSCodeValid,
            message:   'Код сражения должен быть синтаксически корректным JS кодом!'
        },
        required: [true, 'Не указан программный код']
    }
});

module.exports = mongoose.model('combat.code', schema);

function isJSCodeValid(code) {

    const syntax = esprima.parse(code, {tolerant: true, loc: true});
    const errors = syntax.errors;

    return errors.length === 0;

}
