'use strict';
/**
 * @since 21.03.17
 * @author iretd
 */

var lodash = require('lodash');

var ObjectID = require('mongodb').ObjectID;

module.exports = LeaderBoard();

function LeaderBoard() {

	let t = {};

	t.tryToMarkUser = tryToMarkUser;
	t.prepareForResponse = prepareForResponse;

	return t;

	/**
	 * Реализация пометки пользователя в таблице leaderBoard'a.
	 * Процесс пометки представляет из себя определение свойства isItMe со значением true
	 * для искомого юзера.
	 * Ожидается, что таблица была получена из mongodb -> поле idUser в leaderBoard имеет
	 * тип ObjectID.
	 * @param args.idUser - 24 byte hex string idUser'a, которая кастуется к ObjectId.
	 * @param args.leaderBoard - таблица лидеров выдернутая из mongodb.
	 * @returns {number}
	 */
	function tryToMarkUser(args) {

		// Осуществляем поиск позиции пользователя в leaderBoard'e по полю idUser

		let user = lodash.find(args.leaderBoard, {idUser: new ObjectID(args.idUser)});

		if (user) {

			user.isItMe = true;

		}

	}

	/**
	 * Подготовка leaderBoard'a к выдаче пользователю в качестве ответа на запрос.
	 * Подготовка включает в себя оставление ТОЛЬКО полей 'totalFinalScore',  'name' и
	 * 'isItMe' (будет определено для текущего пользователя в таблице).
	 */
	function prepareForResponse(leaderBoard) {

		// Избавляемся от поля idUser в элементах leaderBoard перед выдачей.
		lodash.forEach(leaderBoard, function(record, index) {

			leaderBoard[index] = lodash.pick(record, ['totalFinalScore', 'name', 'isItMe']);

		});

	}
}
