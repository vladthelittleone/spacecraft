/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */

var User = require('models/user').User;

module.exports = function (req, res, next)
{
	req.user = null;

	if (!req.session.user)
	{
		return next();
    }

	User.findById(req.session.user, function (err, user)
	{
		if (err)
		{
			return next(err);
        }

		req.user = user;

		next();
	});
};
