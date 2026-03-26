
require("dotenv").config(); // ✅ MUST BE FIRST

const express = require("express");
const cors = require("cors");
const Routes = require("./routes/auth.route.js");

require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", Routes);

const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`server is running on port ${Port}`));