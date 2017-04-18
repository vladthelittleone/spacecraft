/**
 * Created by iretd on 27.03.17.
 */

const nodeMailer = require('nodemailer');

const config = require('./../../config');
const emailClientSettings = config.get('serverSettings').emailClient;

module.exports = mailer();

/**
 * Данный модуль инкапсулирует иницилизацию SMPT клиента (с настройками по авторизации на SMTP сервере яндекса).
 * Предоставляет от себя лаконичный метод sendEmail, который можно использовать напрямую, для отправки
 * писем, без каких-либо дополнительных строк кода.
 */
function mailer() {

	let smtpConfig = {
		host:   emailClientSettings.host,
		port:   emailClientSettings.port,
		secure: emailClientSettings.isSecure,
		auth:   {
			user: emailClientSettings.login,
			pass: emailClientSettings.password
		}
	};

	let transporter = nodeMailer.createTransport(smtpConfig);

	let t = {};

	t.sendEmail = sendEmail;

	return t;

	/**
	 * Метод отправки электронного письма.
	 * @param args определяет следующие поля:
	 *          emailOfReceiver - email получателя;
	 *          subject - тема письма;
	 *          plainText - голый текст письма,
	 *          отображается, в случае невозможности получателем
	 *          интерпретировать содержимое html;
	 *          html - html СОДЕРЖИМОЕ письма.
	 */
	function sendEmail(args, callback) {

		let mailOptions = {
			from:    emailClientSettings.from,
			to:      args.emailOfRecipient,
			subject: args.subject,
			text:    args.plainText,
			html:    args.html
		};

		transporter.sendMail(mailOptions, callback);

	}
}
