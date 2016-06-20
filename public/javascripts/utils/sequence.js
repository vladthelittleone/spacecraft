'use strict';

module.exports = Sequence();

/**
 * Объект генерации идентификаторов.
 *
 * Created by vladthelittleone on 09.06.16.
 */
function Sequence ()
{
	var that = {};
	var i = 1;

	that.next = next;

	return that;

	function next()
	{
		return i++;
	}
}
