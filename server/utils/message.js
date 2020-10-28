const MIMEText = require("mimetext");

// create the email message with MIME formatting
const generateEmailMessage = (from, to, subject, body) => {
	const message = new MIMEText();
	message.setSender(from);
	message.setRecipient(to);
	message.setSubject(subject);
	message.setMessage(body);

	return message.asEncoded();
};

module.exports = generateEmailMessage;
