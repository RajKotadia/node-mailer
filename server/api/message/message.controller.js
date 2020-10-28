const Joi = require("joi");
const { googleApiKey } = require("../../config");
const fetcher = require("../../utils/fetch");
const generateEmailMessage = require("../../utils/message");

// validation schema
const schema = Joi.object({
	to: Joi.string().trim().lowercase().email().required(),
	subject: Joi.string(),
	emailBody: Joi.string().trim().min(2).required(),
});

// send email using the Gmail API
const sendMessage = async (req, res, next) => {
	const { user } = req;
	const { to, subject, emailBody } = req.body;

	// check the req body
	const { error } = schema.validate({ to, subject, emailBody });
	if (error) {
		const err = new Error(error.details[0].message);
		res.status(422);
		return next(err);
	}

	try {
		// generate the email message to be sent
		const message = generateEmailMessage(
			user.email,
			to,
			subject,
			emailBody
		);

		// Gmail REST endpoint to send emails
		const endpoint = `https://gmail.googleapis.com/gmail/v1/users/${user.googleId}/messages/send?key=${googleApiKey}`;

		// make a POST request to the endpoint
		const response = await fetcher(endpoint, {
			headers: {
				Authorization: `Bearer ${user.accessToken}`,
			},
			body: {
				raw: message,
			},
		});

		res.status(200).json({
			success: true,
			message: "Message Sent",
			data: {
				id: response.id,
				labels: response.labelIds,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	sendMessage,
};
