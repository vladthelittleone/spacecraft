/**
 * Created by vladthelittleone on 21.10.15.
 */

var seq = function ()
{
    var that = {},
        i = 0;

    that.next = function ()
    {
        return i++;
    };

    return that;
};
