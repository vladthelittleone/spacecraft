/**
 * Created by vladthelittleone on 29.02.16.
 */
var express = require('express');
var router = express.Router();

module.exports = router;

/**
 * Возврат информации о текущем пользователе.
 */
router.get('/info', function (req, res, next) {

	res.send({
		email: req.user.email
	})

});
