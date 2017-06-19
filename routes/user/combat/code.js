/**
 * @since 16.02.17
 * @author iretd
 */

"use strict";

const checkAuthentication = require('./../../../middlewares/check-authentication');
const CombatCodeModel = require('./../../../models/combat.code');

const lodash = require('lodash');
const HttpStatus = require('http-status-codes');
const express = require('express');

const router = express.Router();

module.exports = router;

/**
 * ------------------------------------------------
 * POST
 * ------------------------------------------------
 */

router.post('/user/combat/code', checkAuthentication, (req, res, next) => {

    let idUser = req.user._id;
    let idCombat = req.body.idCombat;
    let code = req.body.code;
    
    if (lodash.idCombat)

    CombatCodeModel.update({idUser, idCombat},
                           {idUser, idCombat, code},
                           {
                               upsert:        true,
                               runValidators: true
                           },
                           (err) => {

                               if (err) {
                                   if (err.name === "ValidationError") {

                                       const message = "Неверный фомат данных параметра запроса!";

                                       return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(message);

                                   } else {

                                       return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);

                                   }
                               }

                               return res.sendStatus(HttpStatus.ACCEPTED);

                           });

});
