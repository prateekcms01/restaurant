const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const newmenu = new MenuItem(req.body);
    const result = await newmenu.save();
    console.log("Menu saved");
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("fetched menu successfully");
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "sour" || taste == "spicy") {
      const data = await MenuItem.find({ taste: taste });
      res.send(data);
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = req.params.id;
    const data = await MenuItem.deleteOne({ _id: item });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
