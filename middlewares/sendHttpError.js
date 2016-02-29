/**
 * @since 03.02.16
 * @author Skurishin Vladislav
 */
module.exports = function (req, res, next)
{
	res.sendHttpError = function (error)
	{
		res.status(error.status || 500);

		if (res.req.headers['x-requested-with'] == 'XMLHttpRequest')
		{
			res.json(error);
		}
		else
		{
			res.send(error.message);
			res.end();
		}
	};

	next();
};
