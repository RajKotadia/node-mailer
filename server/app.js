const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./api");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

// app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

// setup api routes
app.use("/api", routes);

// error handler middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
