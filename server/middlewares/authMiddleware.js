// check whether the current user is authenticated
const authCheck = async (req, res, next) => {
	const { user } = req;

	if (!user) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized",
		});
	}

	next();
};

module.exports = {
	authCheck,
};
