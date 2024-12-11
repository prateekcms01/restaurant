const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
app.use(express.json());

const menuRoutes = require("./routes/MenuRoutes");
app.use("/menuitems", menuRoutes);

const personRoutes = require("./routes/PersonRoutes");
app.use("/person", personRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server is running on port 4000");
});
