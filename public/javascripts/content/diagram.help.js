'use strict';

const joint = require('jointjs');

// Экспорт
module.exports = DiagramHelp();

function DiagramHelp () {

	let t = {};

	t.createLink = createLink;
	t.createBlock = createBlock;
	t.createRhombus = createRhombus;
	t.block = block;

	return t;

	function createRhombus(args) {

		return new joint.shapes.erd.Relationship(createOptionsBlock(args));

	}

	function createLink(graph, source, target, sourceX, sourceY) {

		var erd = joint.shapes.erd;

		var myLink;

		if(!sourceX && !sourceY && source) {

			myLink = new erd.Line({
				source: {id: source.id},
				target: {id: target.id}
			});

		} else {

			myLink = new erd.Line({
				source: {x: sourceX, y: sourceY},
				target: {id: target.id}
			});

		}

		myLink.attr({
			'.connection':    {stroke: '#fff', 'stroke-width': 4},
			'.marker-target': {stroke: '#fff', fill: '#fff', d: 'M 10 0 L 0 5 L 10 10 z'}
		});

		return !sourceX && !sourceY && source ?
				myLink.addTo(graph) :
				myLink;
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
	 * @returns готовый блок диаграммы
	 */
	function createBlock(args) {

		return new joint.shapes.erd.Entity(createOptionsBlock(args));

	}

	function createOptionsBlock(args) {

		return {
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
		}
	}
}


