const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const routes = require("./api");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
require("./services/passportSetup");

// app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initialize passport
passport.initialize();

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

// setup api routes
app.use("/api", routes);

// error handler middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
