/**
 * Created by iretd on 27.03.17.
 */

var nodeMailer = require('nodemailer');

const logger = require('./../../utils/log')(module);

module.exports = mailer();

function mailer() {

	// Все необходимые параметры нашей яндекс почты.
	const yandexMail = {
		login:      'support@spacecraftcode.ru',
		password:   'QETadg135',
		address:    'support@spacecraftcode.ru',
		host:       'smtp.yandex.ru',
		securePort: 465
	};

	let smtpConfig = {
		host:   yandexMail.host,
		port:   yandexMail.securePort,
		secure: true,
		auth:   {
			user: yandexMail.login,
			pass: yandexMail.password
		}
	};

	let transporter = nodeMailer.createTransport(smtpConfig);

	let t = {};

	t.sendEmail = sendEmail;

	return t;

	/**
	 *
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
			from:    yandexMail.address,
			to:      args.emailOfRecipient,
			subject: args.subject,
			text:    args.plainText,
			html:    args.html
		};

		transporter.sendMail(mailOptions, callback);

	}
}
