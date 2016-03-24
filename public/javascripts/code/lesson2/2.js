// Координаты метеорита
var meteorX = 500;
var meteorY = 500;

/**
 * Функция, которая при вызове, заставляет
 * двигаться корабль в направлении метеорита.
 */
function moveToMeteor(spaceCraft)
{
	// Перемещение корабля в сторону meteorX, meteorY (500, 500)
	spaceCraft.moveTo(meteorX, meteorY);
	BBotDebug("Координаты метеорита: " + meteorX + " " + meteorY);
}

/**
 * Функция запуска кода управления кораблем.
 */
this.run = function(spaceCraft, world)
{
	// Вызовите на следующей строке функцию moveToMeteor

};
