const express = require("express");
require("./services/passportSetup");

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const routes = require("./api");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { cookieKey } = require("./config");

const app = express();

// app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// for user session management
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000, // 1 day
		keys: [cookieKey], // to encrypt the cookie
	})
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

// setup api routes
app.use("/api", routes);

// error handler middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
