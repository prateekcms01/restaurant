const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hotels");

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
