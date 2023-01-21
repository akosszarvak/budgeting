const express = require("express");
const db = require("./db/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ledgers", require("./routes/ledgerRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
