/**
 * Код погрузки samples на корабль
 */
this.run = function(transport)
{
	// Объявление переменной груза
	var samples = 'Samples to laboratory';

	// Перемещение к грузому отсеку академии
	transport.moveTo();

	// Производим погрузку груза
	transport.setToCargoHold(samples);
};

