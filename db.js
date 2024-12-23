const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL_LOCAL;
// const url = process.env.MONGO_DBURL;
mongoose.connect(url);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("DataBase connected");
});

db.on("error", (err) => {
  console.log("error", err);
});

db.on("disconnected", () => {
  console.log("Database disconnected");
});

module.exports = db;
