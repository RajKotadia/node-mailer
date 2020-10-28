const getUserInfo = (req, res) => {
	const { user } = req;

	res.status(200).json({
		success: true,
		message: "User Authentication successful",
		data: {
			user: {
				username: user.username,
				email: user.email,
			},
		},
	});
};

module.exports = {
	getUserInfo,
};
