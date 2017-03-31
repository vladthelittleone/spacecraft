/**
 * Created by iretd on 28.03.17.
 */

const mailer = require('./../mailer');

let cheerio = require('cheerio');

const path = require('path');
const fs = require('fs');

var async = require('async');

var validator = require('validator');

const uuidGenerator = require('uuid');

var htmlToText = require('html-to-text');

var EmailConfirmationModel = require('./../../../models/email.confirmation');

const url = require('url');

const logger = require('./../../../utils/log')(module);

const config = require('./../../../config');

// TODO имеет смысл вынести в какой-нибудь хэлпер.
const developmentEnvironmentFlag = process.env.NODE_ENV && process.env.NODE_ENV === "development";

module.exports = emailConfirmation();

function emailConfirmation() {

	let urlConfirmationOptions = {

		hostname: developmentEnvironmentFlag ? 'localhost' : 'spacecraftcode.ru',
		pathname: 'user/emailConfirmation',
		port:     developmentEnvironmentFlag ? config.get('port') : undefined

	};

	let html = fs.readFileSync(path.join(__dirname, 'email.confirmation.html'));
	let $ = cheerio.load(html);

	let t = {};

	t.send = send;

	return t;

	/**
	 * Метод отправки сообщения о просьбе подтвердить текущий электронный адрес.
	 * @param user - объект описывающий пользователя. Ожидаемый формат объекта
	 *                 полностью соответствует формату схемы в модели User (models/user.js).
	 * @param callback TODO задействовать (в процессе отладки не юзал, для удобства).
	 */
	function send(user, callback) {

		let emailOfRecipient = user.email;

		if (emailOfRecipient) {

			let confirmationKey = uuidGenerator();

			async.waterfall([
								function (callback) {

									EmailConfirmationModel.update({idUser: user._id},
																  {confirmationKey: confirmationKey},
																  {
																	  upsert:              true,
																	  setDefaultsOnInsert: true
																  },
																  callback);
								},

								function (callback) {

									let html = prepareHtml(confirmationKey);

									var plainText = htmlToText.fromString(html);

									mailer.sendEmail({
														 subject:          'Пожалуйста, подтвердите свой почтовый адрес',
														 plainText:        plainText,
														 html:             html,
														 emailOfRecipient: emailOfRecipient
													 }, callback);

								}
							], callback);

		}

	}

	/**
	 * Метод подготовки окончательного вида html текста, с учетом
	 * известного confirmationKey, для отправки пользователю.
	 * @param confirmationKey - ключ подтверждения почты. Именно на основании данного ключа
	 * будет строиться индивидуальная ссылка подтверждения почты.
	 * @returns {*}
	 */
	function prepareHtml(confirmationKey) {

		// TODO Не забыть про https, если перейдем на SSL.
		let urlOfConfirmation = url.format({
											   protocol: 'http',
											   hostname: urlConfirmationOptions.hostname,
											   port:     urlConfirmationOptions.port,
											   pathname: urlConfirmationOptions.pathname,
											   query:    {
												   confirmationKey
											   }
										   });

		$('#emailConfirmationButton').attr("href", urlOfConfirmation);

		return $.html();
	}

}
