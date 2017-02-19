// Объявление переменной груза
var container = 'Оружие';

/**
 * Код погрузки container на корабль
 */
this.run = function(transport)
{
	// Перемещение к грузому отсеку академии
	transport.moveToXY(1950, 1950);

	// Производим погрузку груза
	transport.setToCargo(container);
};

