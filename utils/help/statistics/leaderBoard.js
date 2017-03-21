/**
 * @since 21.03.17
 * @author iretd
 */

var lodash = require('lodash');

var ObjectID = require('mongodb').ObjectID;

module.exports = LeaderBoard();

function LeaderBoard() {

	var t = {};

	t.findUserPosition = findUserPosition;
	t.prepareForResponse = prepareForResponse;

	return t;

	/**
	 * Реализация поиска пользователя в таблице leaderBoard'a.
	 * Ожидается, что таблица была получена из mongodb -> поле idUser в leaderBoard имеет
	 * тип ObjectID.
	 * @param args.idUser - 24 byte hex string idUser'a, которая кастуется к ObjectId.
	 * @param args.leaderBoard - таблица лидеров выдернутая из mongodb.
	 * @returns {number}
	 */
	function findUserPosition(args) {

		// Осуществляем поиск позиции пользователя в leaderBoard'e по полю idUser
		return lodash.findIndex(args.leaderBoard, {idUser: new ObjectID(args.idUser)});

	}

	/**
	 * Подготовка leaderBoard'a к выдаче пользователю в качестве ответа на запрос.
	 * Подготовка включает в себя оставление ТОЛЬКО полей 'totalFinalScore' и 'name'.
	 */
	function prepareForResponse(leaderBoard) {

		// Избавляемся от поля idUser в элементах leaderBoard перед выдачей.
		lodash.forEach(leaderBoard, function(record, index) {

			leaderBoard[index] = lodash.pick(record, ['totalFinalScore', 'name']);

		});

	}
}
