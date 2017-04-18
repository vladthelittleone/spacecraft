/**
 * @author Aleksandrov Oleg
 * @since 20.03.17
 */

/**
 *    Template question
 *    question : '',
 *  answerOptions : [],
 *    correctAnswerNumbers : []
 *    correctAnswerDescription: ''
 */

module.exports = Questions();

/**
 * Контент quize
 * @returns {*[]}
 * @constructor
 */
function Questions() {

	return [
		{
			question:                 '<p>Здравствуйте, кадет!</p>' +
									  '<p>В этот раз не будет лекций, не будет практики. ' +
									  'Пришло время в первый и не в последний раз проверить насколько успешно ' +
									  '<strong>Вы</strong> усвоили пройденные уроки.</p> ' +
									  '<p>Для этого нужно ответить на несколько вопросов. ' +
									  'Под каждым вопросом будет несколько вариантов ответов. ' +
									  'Правильным может быть как один так и несколько. ' +
									  '<p>Выбирайте с умом.</p></p><p>Вам все понятно?</p>',
			answerOptions:            [{text: 'Да'}],
			correctAnswerNumbers:     [0],
			// Если пользователь не вмешиваеться в код, то он никогда не должне увидеть это сообщение.
			correctAnswerDescription: 'Поразительно, что Вы не смогли неправильно ответить на вопрос, ' +
									  'в котором нет неправильных вариантов ответов.'
		},
		{
			question:                 '<p>Хорошо, начнем с увертюры.</p>' +
									  '<p></p>Представте, что Вы пилотируете космический корабль. ' +
									  'И вот-вот столкнетесь с огромным метеоритом летящим навстречу. ' +
									  'От капитана поступает приказ: <i>"Мистер Сулу немедленно выполнить поворот налево”</i>.<p> ' +
									  '<p>Какую команду вы отдадите кораблю?</p>',
			answerOptions:            [{text: 'transport.rotateRight()'},
				{text: 'transport.rotateLeft()'},
				{text: 'transport.rotate()'},
				{text: 'transport.stop()'}],
			correctAnswerNumbers:     [1],
			correctAnswerDescription: '<p>transport.rotateLeft()</p>' +
									  '<p>rotate left - поворот налево.</p>'
		},
		{
			question:                 '<p>Уфф…</p><p>Кажется опасность позади, ' +
									  'но назойливый <strong>BBot</strong> не дает спокойно отдохнуть. ' +
									  '<p>Его нужно немного проучить.</p>' +
									  '<p>Например, заставить сказать, что-нибудь против его воли.</p>',
			answerOptions:            [{text: '"BBot плохой робот"'},
				{text: 'BBot плохой робот'},
				{text: 'BBotDebug(BBot плохой робот)'},
				{text: 'BBotDebug(\'BBot плохой робот\')'}],
			correctAnswerNumbers:     [3],
			correctAnswerDescription: 'BBotDebug(\'BBot плохой робот.\')'
		},
		{
			question:                 '<p>Тревога! Тревога!<p>' +
									  '<p>Пока Вы мстили BBot’у на корабль напали пришельцы и похитили всех членов экипажа.<p>' +
									  '<p>Они требуют показать на что Вы способны. ' +
									  'Доказать, что в непроглядной тьме, Вы способны найти лучик истины.</p>',
			answerOptions:            [{text: '1 / 2 * 3 > 2'},
				{text: 'false'},
				{text: '15 / 3 * 2/1 > 5 * 2 - 1'},
				{text: '19 - 45 / 2 > 93 + 100 / 11 + 1'}],
			correctAnswerNumbers:     [2],
			correctAnswerDescription: '15 / 3 * 2/1 > 5 * 2 - 1'
		},
		{
			question:                 '<p>Кажется пришельцев устроил Ваш ответ, но это не точно.</p>' +
									  '<p>Пора перестать испытывать их гостеприимство. ' +
									  'Нужно бежать, как можно быстрее.</p>' +
									  '<p>Но дверь с кодовым замком преграждает вам путь. ' +
									  'На дисплее горит надпись: <i>"кошечка говорит мяу, ' +
									  'собака говорит гав, корова говорит му, <strong>typeof 42 говорит?"</strong></i></p>',
			answerOptions:            [{text: 'String'},
				{text: 'Number'},
				{text: 'Null'},
				{text: 'Object'}],
			correctAnswerNumbers:     [1],
			correctAnswerDescription: '42 это число.'
		},
		{
			question:                 '<p>До свободы остался всего один шаг, но похоже корабль, ' +
									  'на который <strong>Вы</strong> пробрались не заправлен.</p>' +
									  '<p><strong>BBot</strong> любезно готов предоставить Вам пластиковую трубку и канистру, ' +
									  'но пожалуй силу <strong>Ваших</strong> легких мы проверим в другой раз.</p> ' +
									  '<p>Воспользоваться терминалом заправочной станции будет куда проще.</p>' +
									  '<p>Переместите топливо из контейнера заправочной станции в контейнер корабля.</p>',
			answerOptions:            [{text: 'spaceShipFuelContainer = fuelContainer.getFuel()'},
				{text: 'fuelContainer = spaceShipFuelContainer'},
				{text: 'spaceShipFuelContainer = fuelContainer'},
				{text: 'spaceShip =  fuelContainer'}],
			correctAnswerNumbers:     [0],
			correctAnswerDescription: 'spaceShipFuelContainer = fuelContainer.getFuel()'
		},
		{
			question:                 '<p>Вам все-таки удалось спастись.</p>' +
									  '<p>И похоже,  по этому поводу в академии решили закатить вечеринку. ' +
									  'Вечеринка в самом разгаре. Прогуливаясь по банкетному залу, почти в самом центре, ' +
									  'Вы замечаете пятерых кадетов, среди всех присутствующих они выделяются необычной ' +
									  'для этих мест нарукавной нашивкой HHC.</p>' +
									  '<p>Ненароком Вы услышали, как один из них сказал - "undefined это тоже самое, ' +
									  'что и null". Вы не могли не вмешаться. Потому что?</p>',
			answerOptions:            [{text: 'Все верно и нужно помочь кадету доказать его правоту'},
				{text: 'Null - значение не задано. undefined - отсутсвует'},
				{text: 'undefined - начение не задано. Null - отсутсвует'},
				{text: 'Кадеты работать и учиться! Хватит прохлаждаться'}],
			correctAnswerNumbers:     [1],
			correctAnswerDescription: ''
		}

	];
}
