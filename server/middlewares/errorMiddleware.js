// not found handler
const notFound = (req, res, next) => {
	const error = new Error("Not found");
	res.status(404);
	next(error);
};

// general error handler
const errorHandler = (err, req, res, next) => {
	res.status(res.statusCode || 500);
	res.json({
		success: false,
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
	});
};

module.exports = {
	notFound,
	errorHandler,
};
