// Координаты метеорита
var meteorX = 500;
var meteorY = 500;

/**
 * Функция, которая при вызове, заставляет
 * двигаться корабль в направлении метеорита.
 *
 * Вы можете использовать ее в любой точке кода.
 */
function moveToMeteor(spaceCraft)
{
	spaceCraft.moveTo(meteorX, meteorY);
}

/**
 * Функция запуска кода управления кораблем.
 */
this.run = function(spaceCraft, world)
{
	// Используем функцию по назначению.
	// Плывем к метеориту.
	moveToMeteor(spaceCraft);
};
