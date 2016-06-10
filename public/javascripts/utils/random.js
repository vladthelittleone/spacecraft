'use strict';

module.exports = RandomUtils();

/**
 * Функциональность рандомизации, необходимая во всех частях системы.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function RandomUtils ()
{
	var that = {};

	that.lessonsArray = [];
	that.randomInt = randomInt;
	that.randomArbitrary = randomArbitrary;
	that.random = random;
	that.randomOf = randomOf;

	return that;

	/**
	 * Returns a random number between min (inclusive) and max (exclusive)
	 */
	function randomArbitrary (min, max)
	{
		return Math.random() * (max - min) + min;
	}

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function randomInt (min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Возвращает случайное между 1 и 0 или true и false.
     */
	function random ()
	{
		return this.randomInt(0, 1);
	}

	/**
	 * Возвращает случайно одно из заданных чисел.
     */
	function randomOf (i1, i2)
	{
		return this.random() ? i1 : i2;
	}

}

