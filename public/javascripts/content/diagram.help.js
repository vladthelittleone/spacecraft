'use strict';

var joint = require('jointjs');

// Экспорт
module.exports = DiagramHelp();

function DiagramHelp () {

	var t = {};

	t.createLink = createLink;
	t.blockWithAdvancedSettings = blockWithAdvancedSettings;
	t.block = block;

	return t;

	function createLink(graph, elm1, elm2) {

		var erd = joint.shapes.erd;

		var myLink = new erd.Line({
			source: {id: elm1.id},
			target: {id: elm2.id}
		});

		myLink.attr({
			'.connection':    {stroke: '#fff', 'stroke-width': 4},
			'.marker-target': {stroke: '#fff', fill: '#fff', d: 'M 10 0 L 0 5 L 10 10 z'}
		});

		return myLink.addTo(graph);

	}

	function block(x, y, text, colorFill) {

		return createBlock({x, y, text, colorFill});

	}

	/**
	 * Метод создает блок диаграмму с различными настройками
	 * x, y, width, , text, colorFill, colorStroke
	 * @param args - в данном массиве могут содержаться следующие элементы,
	 * если какой-либо элемент из списка отсутсвует, то принимается значение по умолчанию
	 * x - координата x в расположении блока
	 * y - координата y в расположении блока
	 * width - ширина блока
	 * height - высота блока
	 * text - текст блока
	 * colorFill - текст заливки блока, формата #ffffff
	 * colorStroke - цвет границы блока, формата #ffffff
	 * @returns - готовый блок диаграммы
	 */
	function blockWithAdvancedSettings(args) {

		return createBlock(args);

	}

	function createBlock(args) {

		var erd = joint.shapes.erd;

		return new erd.Entity({
			size: {
				width: args.width || 150,
				height: args.height || 50
			},
			position: {x: args.x, y: args.y},
			attrs:    {
				text:             {
					fill:             '#ffffff',
					text:             args.text || '',
					'letter-spacing': 0
				},
				'.outer, .inner': {
					fill:   args.colorFill || 'none',
					stroke: args.colorStroke || 'none'
				}
			}
		});
	}
}


