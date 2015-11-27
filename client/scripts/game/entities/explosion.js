/**
 * Created by vladthelittleone on 10.11.15.
 * @constructor
 */
var Explosion = function (x, y, scale)
{
    var boomSprite = SCG.game.add.sprite(x, y, 'explosion');

    if (scale)
    {
        boomSprite.scale.setTo(scale);
    }

    boomSprite.anchor.x = 0.5;
    boomSprite.anchor.y = 0.5;

    // массив это то какие кадры использовать и в какой последовательности
    boomSprite.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

    // вторая констатна это количество кадров в секунду при воспроизвелении анимации
    boomSprite.play('boom', 16, false, true);
};
