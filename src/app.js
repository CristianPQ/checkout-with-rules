const express = require("express");
const app = express();
const errorHandler = require("./lib/middleware/error-handler");
const checkoutApp = require("./apps/checkout/router");

app.use("/checkout", checkoutApp);

app.use(errorHandler());

module.exports = app;
