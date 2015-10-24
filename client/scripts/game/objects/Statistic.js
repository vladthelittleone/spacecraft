/**
 * Created by Ivan on 24.10.2015.
 */

var Statistic = function ()
{
    var that = {},
        takenBonus = 0,
        killEnemy = 0,
        takenDamage = 0,
        acceptDamege = 0,
        totalScore ;

    that.addBonus = function ()
    {
        takenBonus++;
    };

    that.addKillEnemy = function ()
    {
        killEnemy++;
    };

    that.addTakenDamage = function (damage)
    {
        takenDamage += damage;
    };

    that.addAcceptDamage = function (damage)
    {
        acceptDamege += damage;
    };

    that.calculateTotalScore = function ()
    {
        totalScore = takenBonus * 2 + killEnemy * 10 - takenDamage + acceptDamege * 2;
    };

    that.getTotalScore = function ()
    {
        return totalScore;
    };

    that.getTakenDamage = function ()
    {
        return takenDamage;
    };

    that.getKillEnemy = function ()
    {
        return killEnemy;
    };

    that.getAcceptDamage = function ()
    {
        return acceptDamege;
    };

    that.getTakenBonus = function ()
    {
        return takenBonus;
    };

    return that;
}