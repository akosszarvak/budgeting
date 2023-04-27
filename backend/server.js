const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = require("./app");

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = { app, server };
