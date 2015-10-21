/**
 * Created by vladthelittleone on 21.10.15.
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

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function randomArbitrary(min, max)
{
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function randomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var seq = function ()
{
    var that = {},
        i = 1;

    that.next = function ()
    {
        return i++;
    };

    return that;
};
