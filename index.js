const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

const menuRoutes = require("./routes/MenuRoutes");
app.use("/menuitems", menuRoutes);

const personRoutes = require("./routes/PersonRoutes");
app.use("/person", personRoutes);

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
