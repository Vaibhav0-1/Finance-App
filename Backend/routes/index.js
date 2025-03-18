const express = require("express");
const UserRouter = require("./user.js");
const app = express();

const router = express.Router();

app.use("/api/v1", UserRouter);


module.exports = router;
