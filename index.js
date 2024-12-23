const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");
app.use(express.json());

// This is middleware function which execute after req till response .
const midde = (req, res, next) => {
  console.log("this is middleware");
  next();
};

app.use(passport.initialize());
const auth = passport.authenticate("local", { session: false });

app.get("/", auth, (req, res) => {
  res.send("This is hotel Management");
});

const menuRoutes = require("./routes/MenuRoutes");
app.use("/menuitems", menuRoutes);

const personRoutes = require("./routes/PersonRoutes");
app.use("/person", auth, personRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server is running on port 4000");
});
