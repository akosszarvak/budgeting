const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ledgers", require("./routes/ledgerRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

app.use(errorHandler);

module.exports = app;
