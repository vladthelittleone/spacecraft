/**
 * @author Aleksandrov Oleg
 * @since 20.03.17
 */

/**
 * 	Template question
 * 	question : "",
 *  answerOptions : [],
 * 	correctAnswerNumbers : []
 */

module.exports = Quiz0();

function Quiz0() {

	return [
				{
					question : "Здравствуй кадет!" +
					           "В этот раз не будет лекций, не будет практики. " +
							   "Пришло время первый и не последний раз проверить " +
					           "насколько успешно Вы усваиваете уроки." +
							   "Для этого нужно ответить на несколько вопросов. " +
							   "Под каждым вопросом есть несколько вариантов ответов. " +
							   "Правильным может быть как один так и несколько вариантов." +
							   "Выбирай с умом. " +
					           "Вам все понятно?",
					answerOptions : ["Да.", "Все понятно."],
					correctAnswerNumbers : [0, 1],
					correctAnswerDescription: "Поразительно, что Вы не смогли неправильно ответить на вопрос, " +
					                          "в котором нет неправильных вариантов ответов."
				},
		// к 0 уроку нет особого смысла что-то спрашивать
		// к 1 уроку
		        {
					question : "Вы уже должны были познакомиться с BBot'ом. " +
					           "Не смотря на его нахальство, он крайне полезен " +
					           "как начинающим так и опытным пилотам. " +
					           "Например, можно заставить BBot'a сказать что-то против его воли." +
					           "Какая функция поможет Вам в этом?",
					answerOptions : [
										"\"BBot плохой робот.\"",
										"'BBot плохой робот.'",
										"BBotDebug(BBot плохой робот.)",
										"BBotDebug('BBot плохой робот.')"
					                ],
					correctAnswerNumbers : [3],
					correctAnswerDescription: "BBotDebug('BBot плохой робот.')"
				},
				{
					question : "Вы пилотируете космический корабль. " +
					           "Капитан коробля отдает приказ повернуть налево. " +
							   "Какую команду вы отдатите кораблю?",
					answerOptions : [
										 "transport.rotateRight()",
										 "transport.rotateLeft()",
										 "transport.rotate()",
										 "transport.stop()"
					                ],
					correctAnswerNumbers : [1],
					correctAnswerDescription: "transport.rotateLeft()"
				}
			];

}
