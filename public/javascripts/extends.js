/**
 * Изменение прототипа функций.
 *
 * Created by vladthelittleone on 08.06.16.
 */
Array.prototype.removeElement = function (element)
{
	var index = this.indexOf(element);
	this.removeElementByIndex(index)
};

Array.prototype.removeElementByIndex = function (index)
{
	if (index > -1)
	{
		this.splice(index, 1);
	}
};
