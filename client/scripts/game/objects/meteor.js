/**
 * Created by V-eNo-M on 19.11.2015.
 */

var Meteor = function (spec){

    var that = {};

    var game = SCG.game;
    var x = that.x = spec.x;
    var y = that.y = spec.y;

    // Добавляем спрайт метеора
    var sprite = that.sprite = game.add.sprite(x, y, spec.spriteName);

    that.getX = function()
    {
        return sprite.x;
    };

    that.getY = function()
    {
        return sprite.y;
    };
};
