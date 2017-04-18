/**
 * Created by iretd on 28.03.17.
 */

const mailer = require('./../mailer');

const cheerio = require('cheerio');

const path = require('path');
const fs = require('fs');

const async = require('async');

const validator = require('validator');

const lodash = require('lodash');

const uuidGenerator = require('uuid');

const EmailConfirmationModel = require('./../../../models/email.confirmation');

const url = require('url');

const config = require('./../../../config');
const serverSettings = config.get('serverSettings');

// TODO имеет смысл вынести в какой-нибудь хэлпер.
const developmentEnvironmentFlag = process.env.NODE_ENV && process.env.NODE_ENV === "development";

module.exports = emailConfirmation();

/**
 * Данный модуль включает в себя бизнес-логику процесса отправки письма пользователю
 * о подтверждении электронной почты.
 * Модуль берет на себя обязанности:
 * 1) Генерация ссылки для подтверждения посты пользователем;
 * 2) Занесение в коллекцию email.Confirmations документа о факте отправки письма пользователю;
 * 3) Внедрение ссылки подтверждения почты в тело письма;
 *
 * Вся выше обозначенная логика инкапсулирована внуть метода send.
 */
function emailConfirmation() {

	let urlConfirmationOptions = {

		hostname: developmentEnvironmentFlag ? 'localhost' : serverSettings.url.host,
		pathname: 'user/confirmEmail',
		port:     developmentEnvironmentFlag ? serverSettings.developmentPort : undefined

	};

	let html = fs.readFileSync(path.join(__dirname, '/template/template.html'));

	// На случай, если почтовый клиент пользователя не в состоянии интерпретировать html.
	let plainText = fs.readFileSync(path.join(__dirname, '/template/plain.text.txt'));

	let $ = cheerio.load(html);

	let t = {};

	t.send = send;

	return t;

	/**
	 * Метод отправки сообщения пользователю о просьбе подтвердить его текущий электронный адрес.
	 */
	function send(user, callback) {

		let emailOfRecipient = user.email;

		if (emailOfRecipient) {

			let confirmationKey = uuidGenerator();

			async.waterfall([
								// Заносим в коллекцию запись о факте отправки письма.
								updateEmailConfirmationModel,

								// Подготавливаем тело письма
								prepareEmailBody,

								// Отправка письма
								(emailBody, callback) => mailer.sendEmail({
																			  subject:          emailBody.subject,
																			  plainText:        emailBody.plainText,
																			  html:             emailBody.html,
																			  emailOfRecipient: emailOfRecipient
																		  }, callback)
							], callback);


			// Для лаконичности определения коллбэков в async, выносим их определения в отдельные методы
			// в рамках текущего же контекста.
			//------------------------------------------------------------------------------------------
			// Занесение в модель подтверждения почты (EmailConfirmationModel) записи
		    //с указанием самого пользователя и ключа подтверждения.
			function updateEmailConfirmationModel(callback) {

				EmailConfirmationModel.updateOne({idUser: user._id},
												 {confirmationKey: confirmationKey},
												 {
													 upsert:              true,
													 setDefaultsOnInsert: true
												 },
												 // Нет необходимости включать в параметры callback'a
												 // результаты update'a.
												 // Посему, явно избегаем его передачи :)
												 function(error, updateResult) {

													 callback(error);

												 });

			}

			function prepareEmailBody(callback) {

				let emailConfirmationUrl = generateConfirmationEmailUrl(confirmationKey);

				let html = prepareHtml(emailConfirmationUrl);

				// TODO Убирать символы табуляции, которые остаются из исходного шаблона
				let plainTextWithConfirmationUrl = preparePlainText(emailConfirmationUrl);

				callback(null,
						 {
							 html:      html,
							 plainText: plainTextWithConfirmationUrl,
							 subject:   serverSettings.emailBody.subject
						 });

			}

		}

	}

	/**
	 * Метод подготовки plain text'a, которая подразумевает за собой вставку
	 * ссылки для подтверждения почты (emailConfirmationUrl) в исходный plainText.
	 */
	function preparePlainText(emailConfirmationUrl) {

		let compiled = lodash.template(plainText);

		return compiled({emailConfirmationUrl});

	}

	/**
	 * Метод генерации ссылки на подтвержление почты пользователя.
	 * @param confirmationKey ключ подтверждения, на основании которого и будет осуществляеться генерация
	 *           ссылки.
	 */
	function generateConfirmationEmailUrl(confirmationKey) {

		// TODO Не забыть про https, если перейдем на SSL.
		return url.format({
							  protocol: serverSettings.url.protocol,
							  hostname: urlConfirmationOptions.hostname,
							  port:     urlConfirmationOptions.port,
							  pathname: urlConfirmationOptions.pathname,
							  query:    {
								  confirmationKey
							  }
						  });
	}

	/**
	 * Метод подготовки окончательного вида html текста, с учетом
	 * известного confirmationKey, для отправки пользователю.
	 * @param emailConfirmationUrl - ключ подтверждения почты. Именно на основании данного ключа
	 * будет строиться индивидуальная ссылка подтверждения почты.
	 * @returns {*}
	 */
	function prepareHtml(emailConfirmationUrl) {

		// TODO Мб lodash'ом через template будет эффективней?
		$('#emailConfirmationButton').attr("href", emailConfirmationUrl);

		return $.html();
	}

}
