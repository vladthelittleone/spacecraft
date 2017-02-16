// Объявление переменной груза
var container = 'Оружие';

/**
 * Код погрузки samples на корабль
 */
this.run = function(transport)
{
	// Перемещение к грузому отсеку академии
	transport.moveToXY(500, 500);

	// Производим погрузку груза
	transport.setToCargo(container);
};

